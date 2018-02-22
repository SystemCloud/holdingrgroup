import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../providers/noticias.service';

@Component({
	selector: 'app-noticias',
	templateUrl: './noticias.component.html',
	styles: []
})
export class NoticiasComponent implements OnInit {
	estadoLado: boolean = true;

	constructor(public _ns: NoticiasService) { 
		this._ns.cargarNoticias().subscribe();
	}

	ngOnInit() {
	}

	cambiarclase(){
		this.estadoLado = !this.estadoLado; 
	}

}
