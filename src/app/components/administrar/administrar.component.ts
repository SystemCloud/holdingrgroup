import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NoticiasService } from '../../providers/noticias.service';
import { NosotrosService } from '../../providers/nosotros.service';
import { Noticia } from '../../interface/noticia.interface';
import { Nosotros } from '../../interface/nosotros.interface';

@Component({
	selector: 'app-administrar',
	templateUrl: './administrar.component.html',
	styles: []
})
export class AdministrarComponent implements OnInit {
	public noticia;
	public event;
	public nombreImg;
	closeResult: string;
	profileUrl;

	constructor(private storage: AngularFireStorage, 
		public afAuth: AngularFireAuth, 
		private router:Router, 
		private modalService: NgbModal, 
		public _ns: NoticiasService,
		public _nos: NosotrosService) {		
		this.afAuth.authState.subscribe( user =>{
			if(!user){
				this.router.navigate(['/home']);
			}
		});
		this.noticia = {
			"titulo": "",
			"descripcion": ""
		}
		this._ns.cargarNoticias().subscribe();
		this._nos.cargarNosotros().subscribe();
	}

	ngOnInit() {
	}

	logout() {
		this.afAuth.auth.signOut();
	}

	updateNoticia(estado = "registrar", noticiaa = null){
		const date = new Date();
		const fecha: string = date.getDate().toString() + "/" 
		+ (date.getMonth() + 1).toString() + "/" 
		+ date.getFullYear().toString();
		let noticia: Noticia = {
			titulo: this.noticia.titulo,
			descripcion: this.noticia.descripcion,
			fecha: fecha,
			tiempo: date.getTime(),
			nombreImg: this.nombreImg
		}
		if(estado != "actualizar"){ 
			this._ns.uploadFile(this.event, this.nombreImg);			
		}
		if(noticiaa != null){
			noticiaa.titulo = this.noticia.titulo;
			noticiaa.descripcion = this.noticia.descripcion;
			noticia = noticiaa;
			console.log(noticia);
		}		
		this._ns.updateNoticia(noticia);
	}

	updateNosotros(nosotro){
		const date = new Date();
		const fecha: string = date.getDate().toString() + "/" 
		+ (date.getMonth() + 1).toString() + "/" 
		+ date.getFullYear().toString();
		let nosotros: Nosotros = {
			descripcion: this.noticia.descripcion,
			fecha: fecha,
			tiempo: date.getTime(),
		}
		this._nos.updateNoticia(nosotros);
	}

	limpiar(titulo = "", descripcion = ""){
		this.noticia.titulo = titulo;
		this.noticia.descripcion = descripcion;
	}

	reemplazarDatos(noticia){
		console.log(noticia);
		this.limpiar(noticia.titulo, noticia.descripcion);
	}

	abrirModal(content, posicion, accion, objeto = null) {
		if(objeto != null){this.reemplazarDatos(objeto);}
		this.modalService.open(content).result.then((result) => {
			
			switch (posicion) {
				case "1":
					if(accion == "1"){ this.updateNoticia()} else {this.updateNoticia("actualizar", objeto)}
					this.limpiar();
					break;
				case "2":
					 this.updateNosotros(objeto);
					break;
				case "3":
					if(accion == "1"){ this.updateNoticia()} else {this.updateNoticia("actualizar")}
					break;
				case "4":
					if(accion == "1"){ this.updateNoticia()} else {this.updateNoticia("actualizar")}
					break;
				
				default:
					if(accion == "1"){ this.updateNoticia()} else {this.updateNoticia("actualizar")}
					break;
			}
		}, (reason) => {
		});
	}

	capturarEvent(event){
		//debemos agregar el tiempo al nombre o hacer algo para que el nombre sea unico
		this.event = event;
		this.nombreImg = event.target.files[0].name;
	}

	subirImagen(event){
		this._ns.uploadFile(event, this.nombreImg);
	}

	eliminarNoticia(key){
		this._ns.eliminarNoticia(key);
	}

	verImagen(nombre, content){
		const ref = this.storage.ref('img/' + nombre);
		this.profileUrl = ref.getDownloadURL();
		this.modalService.open(content).result.then((result) => {
		}, (reason) => {
		});
	}

}
