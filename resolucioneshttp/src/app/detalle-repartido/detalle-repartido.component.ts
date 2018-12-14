import { Injectable, Component, OnInit, Input } from '@angular/core';
import { Repartido} from '../listado-repartidos/repartido';
import {ServiciosRepartidoService} from '../servicios-repartido.service'
import { ListadoRepartidosComponent } from '../listado-repartidos/listado-repartidos.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-detalle-repartido',
  templateUrl: './detalle-repartido.component.html',
  styleUrls: ['./detalle-repartido.component.css']
})
export class DetalleRepartidoComponent implements OnInit {

  @Input() uriRepartido:string;
    //@Input() selectedRepartidoNum:string;
  shortUri:string;
  @Input() repartido : Repartido;

  constructor(private serviciosRepartido: ServiciosRepartidoService) {
   
   }

  ngOnInit() {
  
    this.shortUri= this.uriRepartido.substring(68) //this.uriRepartido;
    console.log('short'+this.shortUri);
    this.serviciosRepartido.getFechaRepartido(this.shortUri).subscribe(
      data => {
        //console.log(data.results.bindings[0].p.value);
        this.repartido.fecha=data.results.bindings[0].p.value;
      },
      err => {
        console.log(err);
      }
    )    
  }

}
