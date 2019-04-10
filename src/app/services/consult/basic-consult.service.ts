import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BasicConsult } from 'src/app/models/basic-parcel-info.interface';

@Injectable({
  providedIn: 'root'
})

export class BasicConsultService {
  inputNupre: string;
  apiURL: string = environment.url;

  constructor(private httpClient: HttpClient) { }

  public getBasicConsult(fmi: string, cadastralCode: string, nupre: string) {
    return this.httpClient.get<BasicConsult>(`${this.apiURL}/query/parcel?fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`);
  }

  public getParcelGeometry(id: string) {
    return this.httpClient.get<any>(`${this.apiURL}/query/parcel/geometry?id=${id}`);
  }
}
