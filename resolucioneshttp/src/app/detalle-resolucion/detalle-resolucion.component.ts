import { Component, OnInit, Input } from '@angular/core';
import { Resolucion } from '../listado-resoluciones/resolucion';
import {ServiciosResolucionService} from '../servicios-resolucion.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-detalle-resolucion',
  templateUrl: './detalle-resolucion.component.html',
  styleUrls: ['./detalle-resolucion.component.css']
})


export class DetalleResolucionComponent implements OnInit {

  public model: any;
  public modelOrg: any;
  public modelTipo: any;
  public modelInv:any;
  public isCollapsed = true;
  public isCollapsedOrg = true;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      //map(term => this.nombres)
     
      map(term => term.length < 1 ? []
        : this.nombres.filter(item => item.b.value.toLowerCase().includes(term.toLowerCase())))  )   
        
  searchOrg = (text$: Observable<string>) =>
    text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 1 ? []
      : this.nombresOrg.filter(item => item.b.value.toLowerCase().includes(term.toLowerCase())))  )    

  searchTipo = (text$: Observable<string>) =>
    text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),     
      map(term => term.length < 1 ? []
       : this.nombresTipo.filter(item => item.b.value.toLowerCase().includes(term.toLowerCase())))  )      
    

  formatter = (x: {a: any, b: any}) => x.b.value;


  @Input() resolucion : Resolucion;
  nombres:any;
  nombresOrg:any;
  nombresTipo:any;

  constructor(private serviciosResoluciones: ServiciosResolucionService) { console.log('out') }

  ngOnInit() {

    this.serviciosResoluciones.getPersonasOrg().subscribe(
      data => {  
        this.nombres=data.results.bindings;              
      },
      err => {
        console.log(err);
      }
    )

    this.serviciosResoluciones.getOrganizaciones().subscribe(
      data => {  
        this.nombresOrg=data.results.bindings;            
      },
      err => {
        console.log(err);
      }
    )

    this.serviciosResoluciones.getTipos().subscribe(
      data => {  
        this.nombresTipo=data.results.bindings;            
      },
      err => {
        console.log(err);
      }
    )
  
  }

  //INSERTO EL DOCUMENTO
  onClickDocumento(tema:string,autor:string,tipo:string,autortipo:string){
    console.log(this.model)
    this.serviciosResoluciones.insertDocumentoResolucion(this.resolucion.uri,tema,tipo,autor,autortipo).subscribe(
      data => {        
      },
      err => {
        console.log(err);
      }
    )    
  }

  //INSERTO LA ACCION
  onClickAccion(descripcion:string,involucrado:string){
    this.serviciosResoluciones.insertAccionResolucion(this.resolucion.uri,descripcion,involucrado).subscribe(
      data => {        
      },
      err => {
        console.log(err);
      }
    )     
    this.serviciosResoluciones.getOrganizaciones().subscribe(
      data => {  
        this.nombresOrg=data.results.bindings;            
      },
      err => {
        console.log(err);
      }
    ) 
  }

  //INSERTO LA ORG
  onClickOrg(nombre:string,tipo:string,parte:string){
    this.serviciosResoluciones.insertOrganizacion(nombre, tipo, parte).subscribe(
      data => {        
      },
      err => {
        console.log(err);
      }
    )  
  }

   //INSERTO LA ORG
   onClickPersona(nombre:string){
    this.serviciosResoluciones.insertPersona(nombre).subscribe(
      data => {        
      },
      err => {
        console.log(err);
      }
    ) 
    this.serviciosResoluciones.getPersonasOrg().subscribe(
      data => {  
        this.nombres=data.results.bindings;              
      },
      err => {
        console.log(err);
      }
    ) 
  }


}
