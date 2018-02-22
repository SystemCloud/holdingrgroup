import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NoticiasService } from '../../providers/noticias.service';

@Component({
	selector: 'app-administrar',
	templateUrl: './administrar.component.html',
	styles: []
})
export class AdministrarComponent implements OnInit {
	public noticia;
	closeResult: string;
	constructor(public afAuth: AngularFireAuth, private router:Router, private modalService: NgbModal, public _ns: NoticiasService) {		
		this.afAuth.authState.subscribe( user =>{
			console.log("Estado del usuario: ", user);
			if(!user){
				this.router.navigate(['/home']);
			}
		});
		this.noticia = {
			"titulo": "",
			"descripcion": ""
		}

		const noticias = _ns.noticias;
	}

	ngOnInit() {
	}

	logout() {
		this.afAuth.auth.signOut();
	}

	open(content) {
		this.modalService.open(content).result.then((result) => {
			this.guardarNoticia();
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {			
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}

	subirImagen(event){
		console.log("imagen");
		this._ns.uploadFile(event);
	}

	guardarNoticia(){
		this._ns.agregarNoticia(this.noticia.titulo, this.noticia.descripcion).then(()=>this.noticia.titulo == "");
	}

	guardarSobreNosotros(){
		
	}
}
