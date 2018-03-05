import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-colombia',
	templateUrl: './colombia.component.html',
	styles: []
})
export class ColombiaComponent implements OnInit {
	lat: number = 51.678418;
	lng: number = 7.809007;

	constructor() { }

	ngOnInit() {
	}

}
