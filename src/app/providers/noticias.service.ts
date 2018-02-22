import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Noticia } from '../interface/noticia.interface';

@Injectable()
export class NoticiasService {
	public noticias: Noticia[] = [];
	private itemsCollection: AngularFirestoreCollection<Noticia>;

	constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

	cargarNoticias(){
		this.itemsCollection = this.afs.collection<Noticia>('noticias', ref => ref.orderBy('tiempo', 'desc'));
		return this.itemsCollection.valueChanges().map((noticias: Noticia[]) => {
			console.log(noticias);
			this.noticias = noticias;
		});
	}

	uploadFile(event) {
		console.log("subiendo");
		const file = event.target.files[0];
		const filePath = 'img';
		const task = this.storage.upload(filePath, file);
	}

	agregarNoticia(titulo: string, descripcion: string){
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
			tiempo: date.getTime()
		}
		return this.itemsCollection.add(noticia);
	}

}
