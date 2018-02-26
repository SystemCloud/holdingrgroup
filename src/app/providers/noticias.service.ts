import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Noticia } from '../interface/noticia.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoticiasService {
	public noticias: Noticia[] = [];
	private itemsCollection: AngularFirestoreCollection<Noticia>;
	private itemDoc: AngularFirestoreDocument<Noticia>;
	item: Observable<Noticia>;

	constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { 
	}

	cargarNoticias(){
		this.itemsCollection = this.afs.collection<Noticia>('noticias', ref => ref.orderBy('tiempo', 'desc'));
		return this.itemsCollection.valueChanges().map((noticia: Noticia[]) => {
			console.log("ver si se ejecuta esto");
			this.noticias = noticia;
		});

	}

	uploadFile(event, nombreImg) {
		console.log("subiendo");
		const file = event.target.files[0];
		const filePath = 'img/' + nombreImg;
		const task = this.storage.upload(filePath, file);
	}

	updateNoticia(noticia: Noticia){
		return this.itemsCollection.doc(String(noticia.tiempo)).set(noticia);
	}

	agregarNoticia(titulo: string, descripcion: string, nombreImg: string){
		console.log(titulo);
		const date = new Date();
		const fecha: string = date.getDate().toString() + "/" 
		+ (date.getMonth() + 1).toString() + "/" 
		+ date.getFullYear().toString();
		console.log(fecha);
		let noticia: Noticia = {
			uid: "1",
			titulo: titulo,
			descripcion: descripcion,
			fecha: fecha,
			tiempo: date.getTime(),
			nombreImg: nombreImg
		}
		return this.itemsCollection.doc(String(noticia.tiempo)).set(noticia);
	}

	eliminarNoticia(key){
		return this.afs.collection<Noticia>('noticias').doc(String(key)).delete();
	}

}
