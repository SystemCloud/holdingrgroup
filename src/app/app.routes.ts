import { RouterModule, Routes } from '@angular/router';
import {
	InicioComponent,
	NosotrosComponent,
	GaleriaComponent,
	ServiciosComponent,
	ContactoComponent,
	NoticiasComponent,
	EmpleadosmesComponent
} from "./components/index.paginas";


const app_routes: Routes = [
	{ path: 'home', component: InicioComponent},
	{ path: 'nosotros', component: NosotrosComponent},
	{ path: 'galeria', component: GaleriaComponent},
	{ path: 'noticias', component: NoticiasComponent},
	{ path: 'servicios', component: ServiciosComponent},
	{ path: 'contacto', component: ContactoComponent},
	{ path: 'empleadosmes', component: EmpleadosmesComponent},
	{ path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const app_routing = RouterModule.forRoot(app_routes, { useHash: true});