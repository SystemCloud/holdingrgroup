import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NoticiasService } from '../../providers/noticias.service';
import { NosotrosService } from '../../providers/nosotros.service';
import { EmpleadomesService } from '../../providers/empleadomes.service';
import { GaleriaService } from '../../providers/galeria.service';
import { Noticia } from '../../interface/noticia.interface';
import { Nosotros } from '../../interface/nosotros.interface';
import { Empleado } from '../../interface/empleado.interface';
import { Galeria } from '../../interface/galeria.interface';

@Component({
	selector: 'app-administrar',
	templateUrl: './administrar.component.html',
	styles: []
})
export class AdministrarComponent implements OnInit {
	public noticia;
	public fotos;
	public event;
	public nombreImg;
	public empleados;
	closeResult: string;
	profileUrl;

	constructor(private storage: AngularFireStorage, 
		public afAuth: AngularFireAuth, 
		private router:Router, 
		private modalService: NgbModal, 
		public _ns: NoticiasService,
		public _nos: NosotrosService,
		public _gs: GaleriaService,
		public _es: EmpleadomesService) {		
		this.afAuth.authState.subscribe( user =>{
			if(!user){
				this.router.navigate(['/home']);
			}
		});
		this.noticia = {
			"titulo": "",
			"descripcion": ""
		}
		this.fotos = {
			"tiempo": "",
			"nombre": "",
			"nombreImg": ""
		}
		this.empleados = {
			"nombre":"",
			"descripcion": "",
			"fecha":"",
			"actitudes": "",
			"desempeno": "",
			"cumplimiento": ""
		}
		this._ns.cargarNoticias().subscribe();
		this._nos.cargarNosotros().subscribe();
		this._es.cargarEmpleados().subscribe();
		this._gs.cargarGalerias().subscribe();
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
			//debemos validar si el campo esta vacio o no			
		}
		if(noticiaa != null){
			noticiaa.titulo = this.noticia.titulo;
			noticiaa.descripcion = this.noticia.descripcion;
			noticia = noticiaa;
			console.log(noticia);
		}		
		this._ns.updateNoticia(noticia);
	}

	updateGaleria(estado = "registrar", galeriaa = null){
		const date = new Date();
		console.log(this.fotos.nombre);
		let galeria: Galeria = {
			nombre: this.fotos.nombre,
			tiempo: date.getTime(),
			nombreImg: this.nombreImg
		}
		if(estado != "actualizar"){ 
			this._gs.uploadFile(this.event, this.nombreImg);	
		}
		if(galeriaa != null){
			galeria.nombre = this.fotos.nombre
		}		
		this._gs.updateGaleria(galeria);
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

	updateEmpleado(estado = "registrar", empleadoo = null){
		const date = new Date();
		let empleado: Empleado = {
			nombre: this.empleados.nombre,
			descripcion: this.empleados.descripcion,
			fecha: this.empleados.fecha,
			tiempo: date.getTime(),
			nombreImg: this.nombreImg,
			actitudes: this.empleados.actitudes,
			desempeno: this.empleados.desempeno,
			cumplimiento: this.empleados.cumplimiento
		}
		if(estado != "actualizar"){ 
			this._es.uploadFile(this.event, this.nombreImg);
			//debemos validar si el campo esta vacio o no			
		}
		if(empleadoo != null){
			empleadoo.nombre = this.empleados.nombre;
			empleadoo.descripcion = this.empleados.descripcion;
			empleadoo.fecha = this.empleados.fecha;
			empleadoo.actitudes = this.empleados.actitudes;
			empleadoo.desempeno = this.empleados.desempeno;
			empleadoo.cumplimiento = this.empleados.cumplimiento;
			empleado = empleadoo;
		}	
		this._es.updateEmpleado(empleado);
	}

	limpiarNoticia(titulo = "", descripcion = ""){
		this.noticia.titulo = titulo;
		this.noticia.descripcion = descripcion;
	}

	limpiar(){
		this.noticia.titulo = "";
		this.noticia.descripcion = "";
		this.empleados.nombre = "";
		this.empleados.descripcion = "";
		this.empleados.fecha = "";
		this.empleados.actitudes = "";
		this.empleados.desempeno = "";
		this.empleados.cumplimiento = "";
		this.fotos.nombre = "";
	}

	reemplazarDatos(noticia){
		this.limpiarNoticia(noticia.titulo, noticia.descripcion);
	}

	reemplazarEmpleado(empleado){
		this.empleados.nombre = empleado.nombre;
		this.empleados.descripcion = empleado.descripcion;
		this.empleados.fecha = empleado.fecha;
		this.empleados.actitudes = empleado.actitudes;
		this.empleados.desempeno = empleado.desempeno;
		this.empleados.cumplimiento = empleado.cumplimiento;
	}

	reemplazarGaleria(galeria){
		this.fotos.nombre = galeria.nombre;
	}

	//falta limpiar los campos

	abrirModal(content, posicion, accion, objeto = null) {
		this.limpiar();
		if(objeto != null){
			this.reemplazarDatos(objeto);
			this.reemplazarEmpleado(objeto);
			this.reemplazarGaleria(objeto);
		}
		this.modalService.open(content).result.then((result) => {			
			switch (posicion) {
				case "1":
				if(accion == "1"){ this.updateNoticia()} else {					
					this.updateNoticia("actualizar", objeto)
				}
				this.limpiarNoticia();
				break;
				case "2":
				this.updateNosotros(objeto);
				break;
				case "3":
				if(accion == "1"){ this.updateEmpleado()} else {
					this.updateEmpleado("actualizar", objeto);
				}
				break;
				case "4":
				if(accion == "1"){ this.updateGaleria()} else {
					this.updateGaleria("actualizar", objeto);
				}
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

	eliminarEmpleado(key){
		this._es.eliminarEmpleado(key);
	}

	eliminarGaleria(key){
		this._gs.eliminarGaleria(key);
	}

	verImagen(nombre, content){
		const ref = this.storage.ref('img/' + nombre);
		this.profileUrl = ref.getDownloadURL();
		this.modalService.open(content).result.then((result) => {
		}, (reason) => {
		});
	}

}
