import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelper } from '../helpers/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  jwt: JwtHelper;
  constructor(private authService: JwtHelper, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.jwt = this.authService.getUserPublicInformation();
    if (this.jwt) {
      return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}