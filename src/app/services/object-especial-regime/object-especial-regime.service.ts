import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestrictionsObjectEspecial } from 'src/app/models/restrictions-object-especial';
import { ModelsEspecialRegime } from 'src/app/models/models-especial-regime.interface';
import { FeaturesObjectEspecial } from 'src/app/models/features-object-especial.interface';


@Injectable({
  providedIn: 'root'
})
export class ObjectEspecialRegimeService {

  constructor(private httpClient: HttpClient) { }

  public GetDataModel(id: Number) {
    return this.httpClient.get<ModelsEspecialRegime>("http://192.168.98.75:9091/ideat/models/" + id);
  }
  public GetRestrictions() {
    return this.httpClient.get<RestrictionsObjectEspecial>("http://192.168.98.75:9091/vu/ore/restrictions")
  }
  public GetFeatures(url: string) {
    return this.httpClient.get<FeaturesObjectEspecial>(url)
  }
  public PostObjectRegister(name: string, model: string, object: string, wsurl: string, fechaInicio: Date, fechaFin: Date, field: string, value: string, urlMasInfo: string, description: string, restriction: any) {
    console.log(object);

    let data = {
      "objSpecialRegime": {
        "id": 0,
        "organization": {
          "id": 1,
          "name": name
        },
        "model": model,
        "object": object,
        "wsurl": wsurl,
        "createAt": fechaInicio,
        "dueDate": fechaFin
      },
      "categories": [
        {
          "category": {
            "id": 0,
            "field": field,
            "value": value,
            "urlMasInfo": urlMasInfo,
            "description": description
          },
          "restrictions": restriction
        }
      ]
    };
    console.log("datos que llegan ", JSON.stringify(data));

    this.httpClient.post("http://192.168.98.75:9091/vu/ore", data).subscribe(
      Res => {
        console.log("Todo bien Good", Res);

      },
      error => {
        console.log("Que mal xD", error);

      }
    )
  }
}
