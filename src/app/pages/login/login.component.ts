import { Component } from '@angular/core';
import * as myGlobals from 'src/globals'; //<==== this one
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public iniciar = true;
  public variable = myGlobals.logeado;
  constructor() {
    this.variable = this.iniciar;
  }
  /**
   * changeStateLogin
   */
  public changeStateLogin() {
    this.variable = this.iniciar;
  }
}
