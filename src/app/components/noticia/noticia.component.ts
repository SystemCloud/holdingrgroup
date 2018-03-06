import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Noticia } from '../../interface/noticia.interface';
import { NoticiasService } from '../../providers/noticias.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
	selector: 'app-noticia',
	templateUrl: './noticia.component.html',
	styles: []
})
export class NoticiaComponent implements OnInit {
	noticia: Noticia;
	id;
	profileUrl;

	constructor(private route: ActivatedRoute, private _ns: NoticiasService, private storage: AngularFireStorage) { 
		this.noticia = {
			titulo: "hey",
			descripcion: "hey",
			tiempo: 0,
			nombreImg: ""
		}
	}

	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get('id');
		this.cargarDatos(this.id);
	}

	cargarDatos(id){
		this._ns.buscar(+id).subscribe(data=>{
			this.noticia = this._ns.noticia[0];
			this.verImagen(this.noticia.nombreImg);
		});
	}

	verImagen(nombre){
		const ref = this.storage.ref('img/' + nombre);
		this.profileUrl = ref.getDownloadURL();		
	}

}
