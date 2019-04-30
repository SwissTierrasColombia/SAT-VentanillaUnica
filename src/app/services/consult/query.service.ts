import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BasicParcelInfo } from 'src/app/models/basic-parcel-info.interface';
import { LegalParcelInfo } from 'src/app/models/legal-parcel-info.interface';
import { PhysicalParcelInfo } from 'src/app/models/physical-parcel-info.interface';
import { EconomicParcelInfo } from 'src/app/models/economic-parcel-info.interface';

@Injectable({
  providedIn: 'root'
})

export class QueryService {
  inputNupre: string;
  apiURL: string = environment.url;
  private token;
  private httpOptions;
  constructor(private httpClient: HttpClient) {
    this.token = sessionStorage.getItem('access_token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Barer ' + this.token
      })
    };
  }

  public getBasicConsult(fmi: string, cadastralCode: string, nupre: string) {
    return this.httpClient.get<BasicParcelInfo>(`${this.apiURL}/query/parcel?fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`, this.httpOptions);
  }

  public getTerrainGeometry(id: number) {
    return this.httpClient.get<any>(`${this.apiURL}/query/terrain/geometry?id=${id}`, this.httpOptions);
  }

  public getParcelGeometry(id: number) {
    return this.httpClient.get<any>(`${this.apiURL}/query/parcel/geometry?id=${id}`, this.httpOptions);
  }

  public getParcelEconomicQuery(fmi: string, cadastralCode: string, nupre: string) {
    const params = `fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`;
    return this.httpClient.get<EconomicParcelInfo>(`${this.apiURL}/query/parcel/economic?${params}`, this.httpOptions);
  }

  public getParcelLegalQuery(fmi: string, cadastralCode: string, nupre: string) {
    const params = `fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`;
    return this.httpClient.get<LegalParcelInfo>(`${this.apiURL}/query/parcel/legal?${params}`, this.httpOptions);
  }

  public getParcelPhysicalQuery(fmi: string, cadastralCode: string, nupre: string) {
    const params = `fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`;
    return this.httpClient.get<PhysicalParcelInfo>(`${this.apiURL}/query/parcel/physical?${params}`, this.httpOptions);
  }

}
