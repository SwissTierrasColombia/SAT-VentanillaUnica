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
    return this.httpClient.get<ModelsEspecialRegime>("http://localhost:9091/ideat/models/" + id);
  }
  public GetRestrictions() {
    return this.httpClient.get<RestrictionsObjectEspecial>("http://localhost:9091/vu/ore/restrictions")
  }
  public GetFeatures(url: string) {
    return this.httpClient.get<FeaturesObjectEspecial>(url)
  }
}
