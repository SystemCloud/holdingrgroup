import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../providers/noticias.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
	selector: 'app-noticias',
	templateUrl: './noticias.component.html',
	styles: []
})
export class NoticiasComponent implements OnInit {
	estadoLado: boolean = true;
	profileImg;
	contador;
	imagenes: any[];

	constructor(public storage: AngularFireStorage, public _ns: NoticiasService) { 
		this._ns.cargarNoticias().subscribe();
		this.contador = 0;
	}

	ngOnInit() {
	}

	cambiarclase(){
		this.estadoLado = !this.estadoLado; 
	}

	//TODO: falta corregir, el metodo esta en un obserbable y hace demasiadas peticiones
	/*imagen(noticia){

		console.log(noticia);
		if(noticia.length > this.contador){
			const ref = this.storage.ref('img/' + noticia.nombreImg);
			this.profileImg = ref.getDownloadURL();
			this.imagenes[this.contador] = this.profileImg;
			this.contador++;

			console.log(this.profileImg);
			console.log(this.imagenes[0]);
		}
		
	}*/

}
