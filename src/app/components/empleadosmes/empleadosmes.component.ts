import { Component, OnInit } from '@angular/core';
import { EmpleadomesService } from '../../providers/empleadomes.service';

@Component({
	selector: 'app-empleadosmes',
	templateUrl: './empleadosmes.component.html',
	styles: []
})
export class EmpleadosmesComponent implements OnInit {

	constructor(public _es: EmpleadomesService) { 
		this._es.cargarEmpleados().subscribe();
	}

	ngOnInit() { 
	}

	reemplazar(){
		//this.nosotros = this._nos.nosotros[0].descripcion;
	}

}
