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
    constructor(private httpClient: HttpClient) {
    }

    public getBasicConsult(fmi: string, cadastralCode: string, nupre: string) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<BasicParcelInfo>(`${this.apiURL}/public/parcel?fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`);
    }

    public getTerrainGeometry(id: number) {
        return this.httpClient.get<any>(`${this.apiURL}/public/terrain/geometry?id=${id}`);
    }

    public getTerrainGeometryImage(id: number) {
        return this.apiURL + '/public/parcel/geometry/png?id=' + id;
    }

    public getParcelGeometry(id: number) {
        return this.httpClient.get<any>(`${this.apiURL}/public/parcel/geometry?id=${id}`);
    }

    public getParcelEconomicQuery(fmi: string, cadastralCode: string, nupre: string) {
        const params = `fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`;
        return this.httpClient.get<EconomicParcelInfo>(`${this.apiURL}/private/parcel/economic?${params}`);
    }

    public getParcelLegalQuery(fmi: string, cadastralCode: string, nupre: string) {
        const params = `fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`;
        return this.httpClient.get<LegalParcelInfo>(`${this.apiURL}/private/parcel/legal?${params}`);
    }

    public getParcelPhysicalQuery(fmi: string, cadastralCode: string, nupre: string) {
        const params = `fmi=${fmi}&cadastralCode=${cadastralCode}&nupre=${nupre}`;
        return this.httpClient.get<PhysicalParcelInfo>(`${this.apiURL}/private/parcel/physical?${params}`);
    }

    public getInteresadosQuery(tipo: string, idTipo: string) {
        return this.httpClient.get<any>(`${this.apiURL}/private/parcel/party?${tipo}=${idTipo}`);
    }

    public getAdministrativeQuery(tid: number) {
        return this.httpClient.get<any>(`${this.apiURL}/private/parcel/affectations?id=${tid}`);
    }
    public getCadastralCode(tid: number) {
        return this.httpClient.get<any>(`${this.apiURL}/public/parcel/cadastralcode?id=${tid}`);
    }

}
