import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ObjectEspecialRegimeService {

  constructor(private httpClient: HttpClient) { }

  public GetDataModel(id: Number) {
    return this.httpClient.get<ModelsEspecialRegime>("http://192.168.98.75:9091/ideat/models/" + id);
  }
}
