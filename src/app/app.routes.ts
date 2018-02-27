import { RouterModule, Routes } from '@angular/router';
import {
	InicioComponent,
	NosotrosComponent,
	GaleriaComponent,
	ServiciosComponent,
	ContactoComponent,
	NoticiasComponent,
	EmpleadosmesComponent,
	LoginComponent,
	NoticiaComponent,
	AdministrarComponent
} from "./components/index.paginas";


const app_routes: Routes = [
	{ path: 'home', component: InicioComponent},
	{ path: 'nosotros', component: NosotrosComponent},
	{ path: 'galeria', component: GaleriaComponent},
	{ path: 'noticias', component: NoticiasComponent},
	{ path: 'noticia/:notician', component: NoticiaComponent},
	{ path: 'servicios', component: ServiciosComponent},
	{ path: 'contacto', component: ContactoComponent},
	{ path: 'empleadosmes', component: EmpleadosmesComponent},
	{ path: 'administrador', component: AdministrarComponent},
	{ path: 'admin', component: LoginComponent},
	{ path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const app_routing = RouterModule.forRoot(app_routes, { useHash: true});