import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoRepartidosComponent } from './listado-repartidos/listado-repartidos.component';
import { YasqeEditorComponent } from './yasqe-editor/yasqe-editor.component';

const routes: Routes = [{path: "", component: ListadoRepartidosComponent}, {path: "query", component: YasqeEditorComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
