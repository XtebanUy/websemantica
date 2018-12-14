import { Component, OnInit, Input } from '@angular/core';
import {ServiciosResolucionService} from '../servicios-resolucion.service';
import { Repartido} from '../listado-repartidos/repartido';
import { Resolucion } from './resolucion';

@Component({
  selector: 'app-listado-resoluciones',
  templateUrl: './listado-resoluciones.component.html',
  styleUrls: ['./listado-resoluciones.component.css']
})
export class ListadoResolucionesComponent implements OnInit {

  @Input() shortUriRepartido: string;
  @Input() resoluciones: any;
  @Input() repartido : Repartido;
  
  selectedResolucion: Resolucion;
  public isCollapsed = false;
  
  constructor(private serviciosResoluciones: ServiciosResolucionService) { }

  onClickResolucion(rep:any){
    
    console.log('rep'+rep.res.value);   
    this.selectedResolucion=new Resolucion(rep.res.value);

    this.serviciosResoluciones.getTextoResoluciones(rep.res.value).subscribe(
      data => {  
        this.selectedResolucion.texto=data.results.bindings[0].t.value;              
      },
      err => {
        console.log(err);
      }
    )


    //this.selectedResolucion.texto="Visto la solicitud del CENUR Litoral Norte - sede Paysandú, y el informe de disponibilidad realizado por el Dpto. de Contaduría RN."
  }

  ngOnInit() {
    
  }

}
