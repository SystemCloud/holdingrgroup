import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
	selector: 'app-administrar',
	templateUrl: './administrar.component.html',
	styles: []
})
export class AdministrarComponent implements OnInit {

	constructor(public afAuth: AngularFireAuth, private router:Router) {
		
		this.afAuth.authState.subscribe( user =>{
			console.log("Estado del usuario: ", user);
			if(!user){
				this.router.navigate(['/home']);
			}
		});

		
	}

	ngOnInit() {
	}

	logout() {
		this.afAuth.auth.signOut();
	}

}
