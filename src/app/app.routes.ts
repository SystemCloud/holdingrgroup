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
	AdministrarComponent,
	ColombiaComponent,
	ArgentinaComponent
} from "./components/index.paginas";


const app_routes: Routes = [
	{ path: 'home', component: InicioComponent},
	{ path: 'nosotros', component: NosotrosComponent},
	{ path: 'galeria', component: GaleriaComponent},
	{ path: 'noticias', component: NoticiasComponent},
	{ path: 'noticia/:id', component: NoticiaComponent},
	{ path: 'servicios', component: ServiciosComponent},
	{ path: 'contacto', component: ContactoComponent},
	{ path: 'colombia', component: ColombiaComponent},
	{ path: 'argentina', component: ArgentinaComponent},
	{ path: 'empleadosmes', component: EmpleadosmesComponent},
	{ path: 'administrador', component: AdministrarComponent},
	{ path: 'admin', component: LoginComponent},
	{ path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const app_routing = RouterModule.forRoot(app_routes, { useHash: true});