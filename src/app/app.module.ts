import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    ServiciosComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBAZ5UIAMzj8cqqWZSBxtXCta5BVCAsxl4'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
