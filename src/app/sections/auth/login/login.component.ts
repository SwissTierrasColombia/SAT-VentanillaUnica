import { Component, OnInit } from '@angular/core';
import { LoginOldService } from 'src/app/services/login/login.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
  }

  loginData = {
    username: "",
    password: ""
  }
  constructor(private serviceOld: LoginOldService, private service: LoginService) { }

  public login() {
    this.serviceOld.login(this.loginData.username, this.loginData.password);
    this.service.login(this.loginData.username, this.loginData.password);
  }
  public onKey(event: any) {
    if (event.key === "Enter") {
      this.login();
    }
  }
}
