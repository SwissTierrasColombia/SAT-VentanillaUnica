import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginOldService {
  data = [];
  apiURL: string = environment.KEYCLOAK_URL;
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  constructor(private httpClient: HttpClient) {

  }
  login(username: string, password: string) {
    let parametros = new HttpParams()
      .set("grant_type", "password")
      .set("client_id", "ventanilla-unica")
      .set("client_secret", "ef705ea9-754b-4178-bcd7-80920c0adb7d")
      .set("username", username)
      .set("password", password)

    return this.httpClient.post<any>(this.apiURL + '/realms/SAT/protocol/openid-connect/token', parametros, { headers: this.httpHeaders })
  }
  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('rol');
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem('access_token') !== null;
  }
}
