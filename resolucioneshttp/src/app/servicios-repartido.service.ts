import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosRepartidoService {

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
  getAllRepartidos():Observable<any> {
    //var data="select * where {graph base:final {?s resoluciones:nroRepartido ?p}}";
    var query="query="+this.prefixBase+" "+this.prefixResvocab+" select * where {graph base:final {?s resvocab:nroRepartido ?p}}"
    return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );       
  }
  
  /*GET ALL REPARTIDO*/
  getDataRepartido(uriRepartido:string):Observable<any> {
    //var data="select * where {graph base:final {?s resoluciones:nroRepartido ?p}}";
    var query="query=prefix base: <http://www.fing.edu.uy/test/> prefix res:<http://www.semanticweb.org/gabriela/ontologies/2018/10/resoluciones/> select * where { graph base:final { res:"+uriRepartido + " ?r ?p}}"
    return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );   
  }

  /*GET ALL REPARTIDOS*/
  getFechaRepartido(uriRepartido:string):Observable<any> {
    var part1="SELECT ?n WHERE { {graph base:final {?q resvocab:fecha ?n}} {SELECT * WHERE {BIND(IRI('"
    var part2="') as ?q) }}}";
    var query="query="+this.prefixBase+this.prefixRes+this.prefixResvocab+part1+uriRepartido+part2;      
    return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );   
  }

  /*GET ALL REPARTIDOS*/
  getAsistenteDecanoRepartido(uriRepartido:string):Observable<any> {
    //var data="select * where {graph base:final {?s resoluciones:nroRepartido ?p}}";
    var query="query=prefix base: <http://www.fing.edu.uy/test/> prefix res:<http://www.semanticweb.org/gabriela/ontologies/2018/10/resoluciones/> prefix res1:<http://www.semanticweb.org/fing/ontologies/2018/resoluciones#> select * where { graph base:final { res:"+uriRepartido + " res1:fecha ?p}}"
    return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );   
  }

  /*INSERT REPARTIDO*/
  insertRepartido(uriRepartido: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" a owl:NamedIndividual}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  insertInfoSesionRepartido(uriRepartido: string, infoSesion: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:infoSesion "+infoSesion+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  /*TO DO*/
  insertFechaRepartido(uriRepartido: string, fecha: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:infoSesion "+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  /*TO DO*/
  insertNumeroRepartido(uriRepartido: string, numero: string) {

    var data="INSERT DATA {graph <http://www.fing.edu.uy/test/final> {resoluciones1:"+uriRepartido+" resoluciones:nroRepartido '"+numero+"'}}";
    var query="query="+this.prefixResvocab+this.prefixRes+this.prefixBase+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  /*TO DO*/
  insertUrlPagRepartido(uriRepartido: string, url: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:infoSesion "+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  /*TO DO*/
  insertResolucionRepartido(uriRepartido: string, uriResolucion: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:infoSesion "+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

   insertAsistenteDecanoRepartido(uriRepartido: string, nombre: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:asistenteDecano resoluciones1:"+nombre+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  insertAsistenteEgresadoRepartido(uriRepartido: string, nombre: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:asistenteEgresados resoluciones1:"+nombre+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  insertAsistenteDocenteRepartido(uriRepartido: string, nombre: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:asistenteDocentes resoluciones1:"+nombre+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  insertAsistenteEstudiantilRepartido(uriRepartido: string, nombre: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:asistenteEstudiantil resoluciones1:"+nombre+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  constructor(private http: HttpClient) { }
}
