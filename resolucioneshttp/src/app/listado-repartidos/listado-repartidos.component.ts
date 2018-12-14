import { Component, OnInit } from '@angular/core';
import { ServiciosRepartidoService } from '../servicios-repartido.service';
import {Repartido} from './repartido';
import { from } from 'rxjs';
import { DetalleRepartidoComponent } from '../detalle-repartido/detalle-repartido.component';
import {ServiciosResolucionService} from '../servicios-resolucion.service';

@Component({
  selector: 'app-listado-repartidos',
  templateUrl: './listado-repartidos.component.html',
  styleUrls: ['./listado-repartidos.component.css']
})
export class ListadoRepartidosComponent implements OnInit {

  repartidos: any[];
  repartido: Repartido;
  selectedRepartido:any;
  selectedRepartidoURI:string;
  fechaRep:string;
  selectedRepartidoNum:string;
  resoluciones: any;


  constructor(private serviciosResoluciones: ServiciosResolucionService, private serviciosRepartido: ServiciosRepartidoService,private detalle:DetalleRepartidoComponent) { }

  ngOnInit() {
      this.serviciosRepartido.getAllRepartidos().subscribe(
      data => {
        //console.log(data.results.bindings[0].p.value);
        this.repartidos=data.results.bindings;
      },
      err => {
        console.log(err);
      }
    );
  }

  onClickRepartido(value:any){
    this.selectedRepartido=value;    
    this.selectedRepartidoURI=this.selectedRepartido.s.value;
    this.selectedRepartidoNum=this.selectedRepartido.p.value;
    this.repartido=new Repartido(this.selectedRepartidoURI,this.selectedRepartidoNum);
    this.resoluciones=[];

    var shortUri=this.selectedRepartidoURI;
    this.serviciosRepartido.getFechaRepartido(shortUri).subscribe(
      data => {
        this.repartido.fecha=data.results.bindings[0].n.value;
      },
      err => {
        console.log(err);
      }
    )    
    this.repartido.shorturi=shortUri;    

    this.serviciosResoluciones.getAllResolucionesRepartido(this.repartido.shorturi).subscribe(
      data => {
        //console.log(data.results.bindings[0].n.value);
        this.resoluciones=data.results.bindings;
      },
      err => {
        console.log(err);
      }
    );
   
    console.log('selectedRepartidoURI'+this.selectedRepartidoURI);
    //this.detalle.test(this.selectedRepartidoURI);
  }
  

}
