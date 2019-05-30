import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginData = {
    username: "",
    password: ""
  }
  constructor(private service: LoginService) { }

  public login() {
    this.service.login(this.loginData.username, this.loginData.password);
  }
  public onKey(event: any) {
    if (event.key === "Enter") {
      this.login();
    }
  }
}
