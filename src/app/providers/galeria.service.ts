import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Galeria } from '../interface/galeria.interface';

@Injectable()
export class GaleriaService {
	public galerias: Galeria[] = [];
	public galeria: Galeria[] = [];
	private itemsCollection: AngularFirestoreCollection<Galeria>;

	constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

	cargarGalerias(){
		this.itemsCollection = this.afs.collection<Galeria>('galerias', ref => ref.orderBy('tiempo', 'desc'));
		return this.itemsCollection.valueChanges().map((galeria: Galeria[]) => {
			this.galerias = galeria;
		});
	}

	uploadFile(event, nombreImg) {
		const file = event.target.files[0];
		const filePath = 'img/' + nombreImg;
		const task = this.storage.upload(filePath, file);
	}

	buscar(key){
		return this.afs.collection<Galeria>('galerias', ref => ref.where('tiempo', '==', key))
			.valueChanges().map((galeria: Galeria[]) => {
				this.galeria = galeria;
			});
		
	}

	updateGaleria(galeria: Galeria){
		return this.itemsCollection.doc(String(galeria.tiempo)).set(galeria);
	}

	eliminarGaleria(key){
		return this.afs.collection<Galeria>('galerias').doc(String(key)).delete();
	}

}
