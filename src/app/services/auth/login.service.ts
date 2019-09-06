import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  data = [];
  apiURL: string;

  constructor(private httpClient: HttpClient, private route: Router, private toastr: ToastrService) {
    this.apiURL = environment.apiBaseUrlPrefix;
  }
  login(username: string, password: string) {
    let data = {
      username,
      password
    }
    return this.httpClient.post<any>(this.apiURL + '/vu/account/login', data, { observe: 'response' });
  }
  logout() {
    sessionStorage.removeItem(environment.nameTokenSession);
  }
}