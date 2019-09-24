import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmationPassword: ""
  }
  constructor() { }

  ngOnInit() {
  }
  register(){}
  
  public onKey(event: any) {
    if (event.key === "Enter") {
      this.register();
    }
  }
}
