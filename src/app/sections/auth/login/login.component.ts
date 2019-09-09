import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

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
