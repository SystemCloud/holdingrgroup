import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Nosotros } from '../interface/nosotros.interface';

@Injectable()
export class NosotrosService {
	public nosotros: Nosotros[] = [];
	private itemsCollection: AngularFirestoreCollection<Nosotros>;

	constructor(private afs: AngularFirestore) { }

	cargarNosotros(){
		this.itemsCollection = this.afs.collection<Nosotros>('nosotros');
		return this.itemsCollection.valueChanges().map((nosotro: Nosotros[]) => {
			this.nosotros = nosotro;
			console.log(this.nosotros);
		});
	}

	updateNoticia(nosotros: Nosotros){
		return this.itemsCollection.doc("1").set(nosotros);
	}

}
