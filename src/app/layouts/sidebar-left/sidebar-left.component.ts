import { Component, OnInit } from '@angular/core';
import { JwtHelper } from '../../helpers/jwt';
import { RoleModel } from 'src/app/models/role.model';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit {
  rol: any;
  mostrarPanelAdmin: boolean;
  constructor(private roles: RoleModel) {
    this.mostrarPanelAdmin = false;
  }

  ngOnInit() {
    this.rol = JwtHelper.getUserPublicInformation();
    if (this.rol.hasOwnProperty('roles')) {
      const role = this.rol.roles.find(elem => {
        return elem === this.roles.administrator;
      });
      if (role) {
        this.mostrarPanelAdmin = true;
      } else {
        this.mostrarPanelAdmin = false;
      }
    }

  }

}
