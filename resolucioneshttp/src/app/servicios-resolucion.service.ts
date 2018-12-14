import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServiciosResolucionService {
  baseUrl ='http://localhost:5820/dbresoluciones/';
  query = 'query?query=';
  
  prefixResvocab="PREFIX resvocab:<http://www.semanticweb.org/fing/ontologies/2018/resoluciones#> ";
  prefixRes="PREFIX res:<http://www.semanticweb.org/fing/ontologies/2018/resoluciones/> ";
  prefixOwl="PREFIX owl:<http://www.w3.org/2002/07/owl#> ";
  prefixBase = "PREFIX base:<http://www.fing.edu.uy/test/base/> ";
  prefixVocab = "<http://www.fing.edu.uy/test/vocab#> ";

  

  httpOptionsInsert= {

    headers: new HttpHeaders({
      "Accept":"application/sparql-results+json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic YWRtaW46YWRtaW4=",
    })
  }
  
  nroRes='';

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /*GET ALL REPARTIDOS*/
  // getAllResolucionesRepartido(uriRepartido:string):Observable<any> {
  //   var part1="SELECT ?n ?a WHERE { {graph base:final {?n resvocab:nroResolucion ?a}}"
  //   var part2="{SELECT ?n WHERE { {graph base:final {?q resvocab:repartidoResolucion ?n}} {SELECT * WHERE {BIND(IRI('"
  //   var part3="') as ?q) }}}}}";
  //   var query="query="+this.prefixBase+this.prefixRes+this.prefixResvocab+part1+part2+uriRepartido+part3;   
  //   return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
  //     map(this.extractData)      
  //   );       
  // }


   getAllResolucionesRepartido(uriRepartido:string):Observable<any> {
    var part1="SELECT ?rep ?res ?num ?acc (count(?d) as ?doc) WHERE {graph base:final { { SELECT ?rep ?res (count(?a) as ?acc) WHERE {  BIND(IRI('"+uriRepartido+"') as ?rep)";
    var part2=" ?rep resvocab:repartidoResolucion ?res. ?res a resvocab:Resolucion. OPTIONAL { ?res resvocab:resolucionAccion ?a.} }  group by ?rep ?res  } ";
    var part3=" ?res resvocab:nroResolucion ?num. OPTIONAL { ?res resvocab:resolucionDocumentos ?d.} } }  group by ?rep ?res ?num ?acc  order by ?num";
    // var part4="{SELECT ?res (count(?a) as ?acc) WHERE {";
    // var part5="?res a resvocab:Resolucion. OPTIONAL{ ?res resvocab:resolucionAcciones ?a.}}";
    // var part6="group by ?res }} OPTIONAL{ ?res resvocab:resolucionDocumentos ?d.}} group by ?num ?numrep ?res ?acc ?rep}";
    // var part7="}  order by ?num";
    var query="query="+this.prefixBase+this.prefixRes+this.prefixResvocab+part1+part2+part3;   
    return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );       
  }

  getTextoResoluciones(uriResolucion:string):Observable<any> {
    var part1="SELECT ?resf ?t where {graph base:intermedio {BIND (IRI(replace(str(<"+uriResolucion;
    var part2=">), str(res:), str(base:)))  AS ?resf)";   
    var part3="  ?resf a vocab:Resolucion. ?resf vocab:texto ?t. }}";
    var query="query="+this.prefixBase+this.prefixRes+this.prefixResvocab+part1+part2+part3;   
    return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );       
  }

   /*INSERT DOCUMENTO-REPARTIDO*/
   insertDocumentoResolucion(uriResolucion:string, tema: string, tipo:string, uriautor: string, tipoorg:string):Observable<any> {

      //es una org
      var part1='INSERT {GRAPH base:final {?q resvocab:resolucionDocumentos ?u. ?u resvocab:temaDocumento "'+tema+ '".';
      var part2='?u resvocab:tipoDocumento "'+tipo+'".';
      var part3=' ?u resvocab:tieneAutor ?a . '    
      var part6="}} WHERE { GRAPH base:final {BIND(IRI('"
      var part7="') as ?q). BIND(IRI(concat(STR(res:),'Doc',STRUUID())) as ?u) .";
      var part8= "BIND(IRI('"+uriautor+ "') as ?a)}}";
      var query="query="+this.prefixBase+this.prefixResvocab+part1+part2+part3+part6+uriResolucion+part7+part8;      

     return this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );       
  }
   
  //poner un check que diga que tipo es si persona u org. Si es org tiene que poner el tipo. En la consulta si es persona hago el insert 
  //a persona y si es organizacion va el tipo.

  /*INSERT DOCUMENTO-REPARTIDO*/
  insertAccionResolucion(uriResolucion:string, descripcion: string, involucrado:string):Observable<any> {

      //es una org
      var part1='INSERT {GRAPH base:final {?q resvocab:resolucionAccion ?acc. ?acc a resvocab:Accion . ';
      var part2='?acc resvocab:descripcionAccion "'+descripcion+'".';
      var part3=' ?acc resvocab:accionInvolucrados ?a .} '     
      var part4="} WHERE { GRAPH base:final {BIND(IRI('"
      var part5="') as ?q). BIND(IRI(concat(STR(res:),'Acc',STRUUID())) as ?acc) .";
      var part6= "BIND(IRI(concat('http://www.semanticweb.org/fing/ontologies/2018/resoluciones/',encode_for_uri('"+involucrado+"'))) as ?a)}}";
      var query="query="+this.prefixBase+this.prefixResvocab+part1+part2+part3+part4+uriResolucion+part5+part6;   
       

    return this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );       
  }

  /*obtener todas las personas u org*/
  getPersonasOrg():Observable<any> {

    var data="select ?a ?b where { GRAPH base:final {?a resvocab:nombre ?b} } ";  
    var query="query="+this.prefixBase+this.prefixResvocab+data;   
       
    return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );   
  }

    /*obtener todas las personas u org*/
    getOrganizaciones():Observable<any> {

      var data="select ?a ?b where { GRAPH base:final {?a resvocab:nombre ?b . ?a a resvocab:Organizacion }} ";  
      var query="query="+this.prefixBase+this.prefixResvocab+data;   
         
      return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
        map(this.extractData)      
      );   
    }

     /*obtener todas las personas u org*/
     getTipos():Observable<any> {

      var data="select distinct (?c as ?b) where { GRAPH base:final { ?a resvocab:tipoOrganizacion ?c }} ";  
      var query="query="+this.prefixBase+this.prefixResvocab+data;   
         
      return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
        map(this.extractData)      
      );   
    }

  /*INSERT DOCUMENTO-REPARTIDO*/
  insertOrganizacion(nombre:string, uriTipo : string, uriParte:string):Observable<any> {

    //es una org
    var part1='INSERT {GRAPH base:final {?org a resvocab:Organizacion . ';
    var part2='?org resvocab:tipoOrganizacion "'+ uriTipo+ '" . ';
    var part3='?org resvocab:esParteDe ?parte} '     
    var part4="} WHERE { GRAPH base:final {BIND(IRI('"+uriParte+"') as ?parte)."   
    var part6= "BIND(IRI(concat(STR(res:),'Org',encode_for_uri('"+nombre+"'))) as ?org)}}";
    var query="query="+this.prefixBase+this.prefixResvocab+part1+part2+part3+part4+part6;   
     

  return this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).pipe(
    map(this.extractData)      
  );       
}

/*INSERT DOCUMENTO-REPARTIDO*/
insertPersona(nombre:string):Observable<any> {

  //es una org
  var part1='INSERT {GRAPH base:final {?per a resvocab:Persona . ';
  var part2='?per resvocab:nombre "'+nombre+'".'; 
  var part3="}} WHERE { GRAPH base:final {BIND(IRI(concat(STR(res:),'Persona',encode_for_uri('"+nombre+"'))) as ?per)}}";
   var query="query="+this.prefixBase+this.prefixResvocab+part1+part2+part3;    

return this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).pipe(
  map(this.extractData)      
);       
}
  /*INSERT REPARTIDO*/
  insertResolucion(uriResolucion: string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" a owl:NamedIndividual}";
    var query="query="+this.prefixResvocab+this.prefixRes+this.prefixOwl+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT NUMERO REPARTIDO*/
  insertNumeroResolucion(uriResolucion: string,numeroResolucion:string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:nroResolucion resoluciones1:"+numeroResolucion+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT EXPEDIENTE REPARTIDO*/
  insertExpedienteResolucion(uriResolucion: string,uriExpediente:string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:resolucionExpediente resoluciones1:"+uriExpediente+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT EXPEDIENTE REPARTIDO*/
  insertSolicitanteResolucion(uriResolucion: string,uriSolicitante:string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:resolucionSolicitante resoluciones1:"+uriSolicitante+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT CANT VOTOS REPARTIDO*/
  insertCantVotosResolucion(uriResolucion: string,cantVotos:number) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:cantVotosResolucion "+cantVotos+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT FECHA REPARTIDO*/
  insertFechaResolucion(uriResolucion: string,fecha:string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:fecha "+fecha+"^^xsd:dateTime}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

 
  constructor(private http: HttpClient) { }
}
