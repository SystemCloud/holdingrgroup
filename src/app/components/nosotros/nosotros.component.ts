import { Component, OnInit } from '@angular/core';
import { NosotrosService } from '../../providers/nosotros.service';

@Component({
	selector: 'app-nosotros',
	templateUrl: './nosotros.component.html',
	styles: []
})
export class NosotrosComponent implements OnInit {

	constructor(public _nos: NosotrosService) { 
		this._nos.cargarNosotros().subscribe();
	}

	ngOnInit() {
	}

}
