import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestrictionsObjectEspecial } from 'src/app/models/restrictions-object-especial';
import { ModelsEspecialRegime } from 'src/app/models/models-especial-regime.interface';
import { FeaturesObjectEspecial } from 'src/app/models/features-object-especial.interface';
import { ToastrService } from 'ngx-toastr';
import { ObjectEspecialRegime } from 'src/app/models/object-especial-regime.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ObjectEspecialRegimeService {
  url: string = environment.urlRegistro
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  public GetDataModel(id: Number) {
    return this.httpClient.get<ModelsEspecialRegime>(this.url + "/ideat/models/" + id);
  }
  public GetRestrictions() {
    return this.httpClient.get<RestrictionsObjectEspecial>(this.url + "/vu/ore/restrictions");
  }
  public GetFeatures(url: string) {
    return this.httpClient.get<FeaturesObjectEspecial>(url)
  }
  public PostObjectRegister(name: string, model: string, object: string, wsurl: string, fechaInicio: Date, fechaFin: Date, categories: any) {
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
      "categories": categories
    };
    console.log("Datos que llegán: ", JSON.stringify(data));

    this.httpClient.post(this.url + "/vu/ore", data)
      .subscribe(
        _ => {
          this.toastr.success("¡Objeto Registrado!")
          window.location.reload()
        },
        error => {
          this.toastr.error("¡Objeto No Registrado!")

        }
      )
  }
  public getObjetoRegister(id: number) {
    return this.httpClient.get<ObjectEspecialRegime>(this.url + "/vu/ore/" + id);
  }

  public updateObjectRegister(idObject: number, idorganization: number, name: string, model: string, object: string, wsurl: string, fechaInicio: Date, fechaFin: Date, categories: any) {
    let data = {
      "objSpecialRegime": {
        "id": idObject,
        "organization": {
          "id": idorganization,
          "name": name
        },
        "model": model,
        "object": object,
        "wsurl": wsurl,
        "createAt": fechaInicio,
        "dueDate": fechaFin
      },
      "categories": categories
    };
    console.log("Datos Actualizados: ", JSON.stringify(data));

    this.httpClient.put(this.url + "/vu/ore", data)
      .subscribe(
        _ => {
          this.toastr.success("¡Objeto actualizado!")
          window.location.reload()
        },
        error => {
          this.toastr.error("El objeto no se actualizo")
          console.log("error update: ", error);
        }
      )

  }
  public deleteObject(id: number) {
    this.httpClient.delete(this.url + "/vu/ore/" + id).subscribe(
      _ => {
        this.toastr.success("¡Objeto Eliminado!")
        window.location.reload()
      },
      error => {
        this.toastr.error("No se elimino el objeto")

      }
    );
  }
}
