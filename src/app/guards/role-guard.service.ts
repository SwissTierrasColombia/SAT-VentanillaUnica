
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelper } from '../helpers/jwt';
import { JwtHelperService } from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';
import { RoleModel } from '../models/role.model';
@Injectable()
export class RoleGuard implements CanActivate {


  constructor(private roles: RoleModel, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    const token = sessionStorage.getItem(environment.nameTokenSession);
    const helper = new JwtHelperService();
    let decodedToken = null;
    try {
      decodedToken = helper.decodeToken(token);
    } catch (error) {
      decodedToken = null;
    }
    //console.log(decodedToken);
    if (!decodedToken) {
      return false;
    } else {
      if (decodedToken.dataToken.hasOwnProperty('roles')) {
        const role = decodedToken.dataToken.roles.find(elem => {
          return elem === this.roles.administrator;
        });
        if (!role) {
          this.router.navigate(['/inicio'])
        } else {
          return true;
        }
      }
    }


  }
}