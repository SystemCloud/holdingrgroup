import { Component, OnInit } from '@angular/core';
import { EmpleadomesService } from '../../providers/empleadomes.service';
import { AngularFireStorage } from 'angularfire2/storage'; 

@Component({
	selector: 'app-empleadomes',
	templateUrl: './empleadomes.component.html',
	styles: []
})
export class EmpleadomesComponent implements OnInit {
	nombre = "¡Somos los mejores!";
	descripcion = "¡Somos los mejores!";
	profileUrl;
	actitudes;
	desempeno;
	cumplimiento;

	constructor(public _es: EmpleadomesService, private storage: AngularFireStorage) { 
		this._es.cargarEmpleados().subscribe(data =>{
			if(!data){
				this.reemplazar();
			}
		});
	}

	ngOnInit() {
	}

	reemplazar(){
		this.nombre = this._es.empleados[0].nombre;
		this.descripcion = this._es.empleados[0].descripcion;
		this.actitudes = this._es.empleados[0].actitudes;
		this.desempeno = this._es.empleados[0].desempeno;
		this.cumplimiento = this._es.empleados[0].cumplimiento;
		this.verImagen(this._es.empleados[0].nombreImg);
	}

	verImagen(nombre){
		const ref = this.storage.ref('img/' + nombre);
		this.profileUrl = ref.getDownloadURL();
	}

}
