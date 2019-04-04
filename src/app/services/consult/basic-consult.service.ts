import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class BasicConsultService {
  inputNupre: string;
  apiURL: string = environment.url;

  public getBasicConsultNupre(id: string){
    return this.httpClient.get(`${this.apiURL}/query/parcel`);
  }
  public getBasicConsultNumPredial<BasicConsult>(id: string){
    this.inputNupre = id;
    return this.httpClient.get<BasicConsult>(`${this.apiURL}/query/parcel`);
  }
  public getBasicConsultFMI(id: string){
    return this.httpClient.get(`${this.apiURL}/query/parcel`);    
  }
  constructor(private httpClient: HttpClient) { }
}
