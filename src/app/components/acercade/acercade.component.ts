import { Component, OnInit } from '@angular/core';
import { NosotrosService } from '../../providers/nosotros.service';

@Component({
	selector: 'app-acercade',
	templateUrl: './acercade.component.html',
	styles: []
})
export class AcercadeComponent implements OnInit {
	nosotros = "¡Somos los mejores!";

	constructor(public _nos: NosotrosService) { 
		this._nos.cargarNosotros().subscribe( data =>{
			if(!data){
				this.reemplazar();
			}
		} );
	}

	reemplazar(){
		this.nosotros = this._nos.nosotros[0].descripcion;
	}

	ngOnInit() {
	}

}
