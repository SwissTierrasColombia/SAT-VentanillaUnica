import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicConsult } from '../../models/basic-parcel-info.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class BasicConsultService {
  
  apiURL: string = environment.url+"/consultageneral/"+1+"/";

  public getBasicConsultNupre(id: String){
    return this.httpClient.get(`${this.apiURL}`);
  }
  public getBasicConsultNumPredial<BasicConsult>(id: String){
    return this.httpClient.get<BasicConsult>(`${this.apiURL}`);
  }
  public getBasicConsultFMI(id: String){
    return this.httpClient.get(`${this.apiURL}`);    
  }
  constructor(private httpClient: HttpClient) { }
}
