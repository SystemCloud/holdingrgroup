import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../providers/galeria.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Galeria } from '../../interface/galeria.interface';

@Component({
	selector: 'app-galeria',
	templateUrl: './galeria.component.html',
	styles: []
})
export class GaleriaComponent implements OnInit {
	galerias: Galeria[] = [];
	profileUrl: any[] = [];
	contador = 0;

	constructor(public storage: AngularFireStorage, public _gs: GaleriaService) { 
		this._gs.cargarGalerias().subscribe(data =>{
			if(!data){
				this.reemplazar();
			}
		} );
	}

	ngOnInit() {
	}

	actualizarContador(){
		if(this.contador<this._gs.galerias.length-1){
			this.contador = this.contador + 1;
		}else{
			this.contador = 0;
		}
		var cont = this.contador - 1;
		if(cont==-1){cont=this._gs.galerias.length-1}
		console.log(cont);
		return cont;
	}

	imagenes(num){
		return this.profileUrl[num];
	}

	reemplazar(){
		for (var i = 0; i < this._gs.galerias.length; i++) {
			this.galerias[i] = this._gs.galerias[i];
			this.profileUrl[i] = this.verImagen(this._gs.galerias[i].nombreImg);
		}
	}

	verImagen(nombre){
		const ref = this.storage.ref('img/' + nombre);
		const imagen = ref.getDownloadURL();
		return imagen;
	}

}
