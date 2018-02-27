import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router'; 
import * as firebase from 'firebase/app';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent implements OnInit {

	public usuario;
	public mensaje = "";
	private _success = new Subject<string>();

	staticAlertClosed = false;
	successMessage: string;

	constructor(public afAuth: AngularFireAuth, private router:Router) {
		this.usuario = {
			"correo":"",
			"password":""
		}

		this.afAuth.authState.subscribe( user =>{
			if(!user){
				return true;
			}

			if(user.email != ""){
				this.router.navigate(['administrador']);
			}
		});

	}

	login(correo, pass) {
		this.afAuth.auth.signInWithEmailAndPassword(correo, pass).catch(login =>{
			this.changeSuccessMessage();
		});
		
	}

	logout() {
		this.afAuth.auth.signOut();
	}

	ngOnInit(): void {
		setTimeout(() => this.staticAlertClosed = true, 20000);

		this._success.subscribe((message) => this.successMessage = message);
		debounceTime.call(this._success, 10000).subscribe(() => this.successMessage = null);
	}

	public changeSuccessMessage() {
		this._success.next(`!Credenciales invalidas!`);
	}

	onSubmit(){
		this.login(this.usuario.correo, this.usuario.password);
	}
}
