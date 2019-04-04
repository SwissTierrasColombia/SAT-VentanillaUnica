import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
    templateUrl: 'procedure-request.component.html'
})
export class ProcedureRequestComponent implements OnInit {

/*     private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }); */
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    formData: any = {
        "tipo_solicitud": "",
        "descripcion": "",
        "nombre_completo": "",
        "tipo_documento": "",
        "numero_documento": "",
        "soporte1_tipo": "",
        "soporte1_url": "",
        "soporte2_tipo": "",
        "soporte2_url": "",
        "soporte3_tipo": "",
        "soporte3_url": ""
    };

    ngOnInit(): void {
    }

    constructor(private http: HttpClient) { }

    solicitar() {
        const  params = new  HttpParams().set("grant_type","password")
                                .set("client_id", "ventanilla-unica")
                                .set("client_secret", "ef705ea9-754b-4178-bcd7-80920c0adb7d")
                                .set("username","prueba")
                                .set("password","prueba");
        /*  let data = {
             "variables": {
                 "solicitud": {
                     "value": JSON.stringify(this.formData),
                     "type": "Object",
                     "valueInfo": {
                         "objectTypeName": "info.proadmintierra.sat.model.Solicitud",
                         "serializationDataFormat": "application/json"
                     }
                 }
             }
         };
         this.http.post<any>("http://192.168.98.69:8082/engine-rest/process-definition/key/sat/start", data , { headers: this.httpHeaders }) */

         this.http.post<{access_token:string}>("http://192.168.98.69:8080/auth/realms/SAT/protocol/openid-connect/token",params, {headers: this.httpHeaders}).subscribe(
             res => {}
         );
    }


}