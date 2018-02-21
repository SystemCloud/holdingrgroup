import { Component, OnInit } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
	selector: 'app-administrar',
	templateUrl: './administrar.component.html',
	styles: []
})
export class AdministrarComponent implements OnInit {

	constructor(public afAuth: AngularFireAuth, private router:Router, public modal: Modal) {
		
		this.afAuth.authState.subscribe( user =>{
			console.log("Estado del usuario: ", user);
			if(!user){
				this.router.navigate(['/home']);
			}
		});

		
	}

	ngOnInit() {
	}


	abrirModal() {
		const dialogRef = this.modal.alert()
		.size('lg')
		.showClose(true)
		.headerClass("title")
		.title('Agregar Noticia')
		.body(`
			<h4>Alert is a classic (title/body/footer) 1 button modal window that 
			does not block.</h4>
			<b>Configuration:</b>
			<ul>
			<li>Non blocking (click anywhere outside to dismiss)</li>
			<li>Size large</li>
			<li>Dismissed with default keyboard key (ESC)</li>
			<li>Close wth button click</li>
			<li>HTML content</li>
			</ul>`)
		.open();

		//dialogRef.result
		//.then( result => alert(`The result is: ${result}`) );
	}

	logout() {
		this.afAuth.auth.signOut();
	}

}
