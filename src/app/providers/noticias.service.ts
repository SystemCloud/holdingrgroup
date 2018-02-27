import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Noticia } from '../interface/noticia.interface';

@Injectable()
export class NoticiasService {
	public noticias: Noticia[] = [];
	private itemsCollection: AngularFirestoreCollection<Noticia>;

	constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { 
	}

	cargarNoticias(){
		this.itemsCollection = this.afs.collection<Noticia>('noticias', ref => ref.orderBy('tiempo', 'desc'));
		return this.itemsCollection.valueChanges().map((noticia: Noticia[]) => {
			this.noticias = noticia;
		});
	}

	uploadFile(event, nombreImg) {
		const file = event.target.files[0];
		const filePath = 'img/' + nombreImg;
		const task = this.storage.upload(filePath, file);
	}

	updateNoticia(noticia: Noticia){
		return this.itemsCollection.doc(String(noticia.tiempo)).set(noticia);
	}

	eliminarNoticia(key){
		return this.afs.collection<Noticia>('noticias').doc(String(key)).delete();
	}

}
