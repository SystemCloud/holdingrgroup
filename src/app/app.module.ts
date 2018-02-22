import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { app_routing } from "./app.routes";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { IntroComponent } from './components/intro/intro.component';
import { ContadorComponent } from './components/contador/contador.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { PaisesComponent } from './components/paises/paises.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { FooterComponent } from './components/footer/footer.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ServiciosComponent } from './components/servicios/servicios.component';

import { AgmCoreModule } from '@agm/core';
import { PostsComponent } from './components/posts/posts.component';
import { EmpleadomesComponent } from './components/empleadomes/empleadomes.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { EmpleadosmesComponent } from './components/empleadosmes/empleadosmes.component';
import { LoginComponent } from './components/login/login.component';
import { AdministrarComponent } from './components/administrar/administrar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NoticiasService } from './providers/noticias.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    IntroComponent,
    ContadorComponent,
    AcercadeComponent,
    PaisesComponent,
    ProyectosComponent,
    FooterComponent,
    NosotrosComponent,
    InicioComponent,
    GaleriaComponent,
    ContactoComponent,
    ServiciosComponent,
    PostsComponent,
    EmpleadomesComponent,
    NoticiasComponent,
    EmpleadosmesComponent,
    LoginComponent,
    AdministrarComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    FormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBAZ5UIAMzj8cqqWZSBxtXCta5BVCAsxl4'
    })
  ],
  providers: [
      NoticiasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
