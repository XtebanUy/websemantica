import { Component, OnInit } from '@angular/core';


declare var YASQE: any;
declare var YASR: any;
declare var $:any;

@Component({
  selector: 'app-yasqe-editor',
  templateUrl: './yasqe-editor.component.html',
  styleUrls: ['./yasqe-editor.component.css']
})


export class YasqeEditorComponent implements OnInit {
  model: { razonador: boolean; };

  //yasqe = YASQE(document.getElementById("yasqe"));


  constructor() {
    
   }

  ngOnInit() {

    this.model = {razonador: true}
    var thus = this;
    var yasr = YASR(document.getElementById("showcase"))
    var yasqe = YASQE(document.getElementById("yasqe"), {
      value: `prefix base:  <http://www.fing.edu.uy/test/base/>
      prefix vocab: <http://www.fing.edu.uy/test/vocab#>
      prefix res: <http://www.fing.edu.uy/resoluciones/>
      prefix resvocab: <http://www.semanticweb.org/fing/ontologies/2018/resoluciones#>
      SELECT * WHERE {
        graph base:final {?sub ?pred ?obj.}
      } 
      LIMIT 20`,
      sparql :{ 
        showQueryButton : true,
        endpoint : "http://localhost:5820/dbresoluciones/query",
        headers: {
          "Accept":"application/sparql-results+json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Basic YWRtaW46YWRtaW4=",
        },
        callbacks: {
          beforeSend: function(xhr, conf)
          {
            conf.data = conf.data+ `&reasoning=${thus.model.razonador}`;
          },
          complete: yasr.setResponse

        }
      }
    });
    ;

  }


}
