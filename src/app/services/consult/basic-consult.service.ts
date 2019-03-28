import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class BasicConsultService {
  inputNupre: string;
  apiURL: string = environment.url+"/consultageneral/"+this.inputNupre+"/";

  public getBasicConsultNupre(id: string){
    return this.httpClient.get(`${this.apiURL}`);
  }
  public getBasicConsultNumPredial<BasicConsult>(id: string){
    this.inputNupre = id;
    return this.httpClient.get<BasicConsult>(`${this.apiURL}`);
  }
  public getBasicConsultFMI(id: string){
    return this.httpClient.get(`${this.apiURL}`);    
  }
  constructor(private httpClient: HttpClient) { }
}
