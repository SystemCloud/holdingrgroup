import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Empleado } from '../interface/empleado.interface';

@Injectable()
export class EmpleadomesService {
	public empleados: Empleado[] = [];
	private itemsCollection: AngularFirestoreCollection<Empleado>;

	constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

	cargarEmpleados(){
		this.itemsCollection = this.afs.collection<Empleado>('empleados', ref => ref.orderBy('tiempo', 'desc'));
		return this.itemsCollection.valueChanges().map((empleados: Empleado[]) => {
			this.empleados = empleados;
		});
	}

	uploadFile(event, nombreImg) {
		const file = event.target.files[0];
		const filePath = 'img/' + nombreImg;
		const task = this.storage.upload(filePath, file);
	}

	updateEmpleado(noticia: Empleado){
		return this.itemsCollection.doc(String(noticia.tiempo)).set(noticia);
	}

	eliminarEmpleado(key){
		return this.afs.collection<Empleado>('empleados').doc(String(key)).delete();
	}

}
