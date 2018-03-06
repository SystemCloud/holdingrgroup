import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../providers/noticias.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Noticia } from '../../interface/noticia.interface';

@Component({
	selector: 'app-noticias',
	templateUrl: './noticias.component.html',
	styles: []
})
export class NoticiasComponent implements OnInit {
	estadoLado: boolean = true;
	noticias: Noticia[] = [];
	profileUrl: any[] = [];
	contador = 0;

	constructor(public storage: AngularFireStorage, public _ns: NoticiasService) { 
		this._ns.cargarNoticias().subscribe(data =>{
			if(!data){
				this.reemplazar();
			}
		} );
	}

	ngOnInit() {
	}

	actualizarContador(){
		if(this.contador<this._ns.noticias.length-1){
			this.contador = this.contador + 1;
		}else{
			this.contador = 0;
		}
		var cont = this.contador - 1;
		if(cont==-1){cont=this._ns.noticias.length-1}
		return cont;
	}

	imagenes(num){
		return this.profileUrl[num];
	}

	cambiarclase(){
		this.estadoLado = !this.estadoLado; 
	}

	reemplazar(){
		for (var i = 0; i < this._ns.noticias.length; i++) {
			this.noticias[i] = this._ns.noticias[i];
			this.profileUrl[i] = this.verImagen(this._ns.noticias[i].nombreImg);
		}
	}

	verImagen(nombre){
		const ref = this.storage.ref('img/' + nombre);
		const imagen = ref.getDownloadURL();
		return imagen;
	}

}
