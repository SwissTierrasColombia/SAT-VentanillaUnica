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

    public getAdministrativeQuery(tid: number) {
        return this.httpClient.get<any>(`${this.apiURL}/private/parcel/affectations?id=${tid}`);
    }


}
