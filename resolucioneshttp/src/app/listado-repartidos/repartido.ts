export class Repartido {
    numero: string;
    uri: string;
    fecha: string;
    asistenteDecana: string;
    shorturi:string;
    
    constructor(uri:string,numero:string){ 
      this.uri = uri;
      this.numero=numero;
    }
  }