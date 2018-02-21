import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent implements OnInit {

	public usuario;


	constructor(public afAuth: AngularFireAuth, private router:Router) {
		this.usuario = {
			"correo":"",
			"password":""
		}

		this.afAuth.authState.subscribe( user =>{
			console.log("Estado del usuario: ", user);
			if(!user){
				return true;
			}

			if(user.email != ""){
				this.router.navigate(['administrador']);
			}
		});

		
	}

	login(correo, pass) {
		this.afAuth.auth.signInWithEmailAndPassword(correo, pass);
		console.log()
	}

	logout() {
		this.afAuth.auth.signOut();
	}

	ngOnInit() {
	}

	onSubmit(){
		console.log(this.usuario.password);
		this.login(this.usuario.correo, this.usuario.password);
	}

}
