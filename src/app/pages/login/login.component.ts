import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  /**
   * changeStateLogin
   */
  public changeStateLogin() {
    sessionStorage.setItem("mostrar", "true");
  }
}
