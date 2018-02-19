import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contacto',
	templateUrl: './contacto.component.html',
	styles: []
})
export class ContactoComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	lat: number = 51.678418;
	lng: number = 7.809007;

}
