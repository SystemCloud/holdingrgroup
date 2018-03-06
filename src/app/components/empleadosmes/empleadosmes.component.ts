import { Component, OnInit } from '@angular/core';
import { EmpleadomesService } from '../../providers/empleadomes.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Empleado } from '../../interface/empleado.interface';

@Component({
	selector: 'app-empleadosmes',
	templateUrl: './empleadosmes.component.html',
	styles: []
})
export class EmpleadosmesComponent implements OnInit {
	empleados: Empleado[] = [];
	profileUrl: any[] = [];
	contador = 0;

	constructor(public _es: EmpleadomesService, public storage: AngularFireStorage) { 
		this._es.cargarEmpleados().subscribe(data =>{
			if(!data){
				this.reemplazar();
			}
		});
	}

	ngOnInit() { 
	}

	actualizarContador(){
		if(this.contador<this._es.empleados.length-1){
			this.contador = this.contador + 1;
		}else{
			this.contador = 0;
		}
		var cont = this.contador;
		if(cont==-1){cont=2}
		return cont;
	}

	imagenes(num){
		console.log(num);
		return this.profileUrl[num];
	}

	reemplazar(){
		for (var i = 0; i < this._es.empleados.length; i++) {
			this.empleados[i] = this._es.empleados[i];
			this.profileUrl[i] = this.verImagen(this._es.empleados[i].nombreImg);
		}
	}

	verImagen(nombre){
		const ref = this.storage.ref('img/' + nombre);
		const imagen = ref.getDownloadURL();
		return imagen;
	}

}
