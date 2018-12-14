import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoRepartidosComponent } from './listado-repartidos/listado-repartidos.component';
import { DetalleRepartidoComponent } from './detalle-repartido/detalle-repartido.component';
import { ListadoResolucionesComponent } from './listado-resoluciones/listado-resoluciones.component';
import { DetalleResolucionComponent } from './detalle-resolucion/detalle-resolucion.component';
import { YasqeEditorComponent } from './yasqe-editor/yasqe-editor.component';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ListadoRepartidosComponent,
    DetalleRepartidoComponent,
    ListadoResolucionesComponent,
    DetalleResolucionComponent,
    YasqeEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
