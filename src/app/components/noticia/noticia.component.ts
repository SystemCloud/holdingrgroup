import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Noticia } from '../../interface/noticia.interface';

@Component({
	selector: 'app-noticia',
	templateUrl: './noticia.component.html',
	styles: []
})
export class NoticiaComponent implements OnInit {
	noticia: Noticia;

	constructor() { }

	ngOnInit() {
		/*this.route.params.subscribe(params => {
			this.noticia = params['notician'];
			console.log(this.noticia);
		})*/
	}

}
