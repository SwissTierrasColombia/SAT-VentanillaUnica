import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParcelConsultService {

  constructor(private http: HttpClient) { }

  getParcelBasicInfo(){
    return this.http.get<any>('/assets/data/info_basica.json');
  }
}
