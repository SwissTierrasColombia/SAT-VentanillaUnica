import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';

import { environment } from "../../../environments/environment";

const globalRequestOptions = new RequestOptions({
  headers: new Headers({'Content-Type': 'application/json'}),
  withCredentials: true
});

@Injectable()
export class RestServiceService {

    constructor(
        private http: Http,
    ) {
    }

    getStudentById(studId: number): Observable<any> {
         return this.http.get(environment.BACKEND_URL+'api/stud/getStudById?studId='+studId, globalRequestOptions)
            .map((res: any) => this.handleTextResponse(res))
            .catch((error: any) => this.handleError(error));
    }

    getStaffById(staffId: number): Observable<any> {
         return this.http.get(environment.BACKEND_URL+'api/staff/getStaffById?staffId='+staffId, globalRequestOptions)
            .map((res: any) => this.handleTextResponse(res))
            .catch((error: any) => this.handleError(error));
    }

    getAllStudent(): Observable<any> {
         return this.http.get(environment.BACKEND_URL+'api/stud/getAll', globalRequestOptions)
            .map((res: any) => this.handleResponse(res))
            .catch((error: any) => this.handleError(error));
    }

    getAllStaff(): Observable<any> {
         return this.http.get(environment.BACKEND_URL+'api/staff/getAll', globalRequestOptions)
            .map((res: any) => this.handleResponse(res))
            .catch((error: any) => this.handleError(error));
    }
    private handleResponse(res: any): any {
        return res.json();
    }

    private handleTextResponse(res: any): any {
        return res.text();
    }

    private handleError(error: any) {
        alert(error);
        return Observable.throw(error || 'Internal server error');
    }
}