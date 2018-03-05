import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../providers/noticias.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Noticia } from '../../interface/noticia.interface';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styles: []
})
export class PostsComponent implements OnInit {
	public noticias: Noticia[] = [];
	nombre = "¡Somos los mejores!";
	descripcion = "¡Somos los mejores!";
	profileUrl: any[] = [Object, Object, Object];
	contador = 0;

	constructor(public _ns: NoticiasService, private storage: AngularFireStorage) {
		this._ns.cargarNoticias().subscribe( data =>{
			if(!data){
				this.reemplazar();
			}
		} );
	}

	actualizarContador(){
		console.log(this.contador);
		if(this.contador<2){
			this.contador = this.contador + 1;
		}else{
			this.contador = 0;
		}
		var cont = this.contador - 1;
		if(cont==-1){cont=2}
		return cont;
	}

	imagenes(num){
		return this.profileUrl[num];
	}

	reemplazar(){
		for (var i = 0; i < 3; i++) {
			this.noticias[i] = this._ns.noticias[i];
			this.profileUrl[i] = this.verImagen(this._ns.noticias[i].nombreImg);
		}
	}

	verImagen(nombre){
		const ref = this.storage.ref('img/' + nombre);
		const imagen = ref.getDownloadURL();
		return imagen;
	}

	ngOnInit() {
	}

}
