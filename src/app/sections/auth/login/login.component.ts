import { Component, OnInit } from '@angular/core';
import { LoginOldService } from 'src/app/services/login/login.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private serviceOld: LoginOldService,
    private service: LoginService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  dataLoginOld = [];
  loginData = {
    username: "",
    password: ""
  }
  ngOnInit(): void {
  }

  public login() {
    this.service.login(this.loginData.username, this.loginData.password).subscribe(
      response => {
        console.log(this.dataLoginOld = JSON.parse(atob(response.body.token.split('.')[1])));
        sessionStorage.setItem(environment.nameTokenSession, response.body.token)
        this.serviceOld.login("dnp", "dnp").subscribe(
          res => {
            this.dataLoginOld = JSON.parse(atob(res.access_token.split('.')[1]))
            sessionStorage.setItem('access_token', res.access_token);
            this.route.navigate(['inicio']);
          }); //fin login antiguo
      }); //login nuevo
  }
  public onKey(event: any) {
    if (event.key === "Enter") {
      this.login();
    }
  }
}
