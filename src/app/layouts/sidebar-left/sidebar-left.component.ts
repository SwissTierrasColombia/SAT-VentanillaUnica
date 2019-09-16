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
  mostrarEntidad: boolean;
  constructor(
    private roles: RoleModel
  ) {
    this.mostrarPanelAdmin = false;
    this.mostrarEntidad = false;
  }

  ngOnInit() {
    this.rol = JwtHelper.getUserPublicInformation();
    //console.log("this.rol: ", this.rol);
    if (this.rol.hasOwnProperty('roles')) {
      const role = this.rol.roles.find(elem => {
        return elem._id === this.roles.Administrador;
      });
      if (role) {
        this.mostrarPanelAdmin = true;
      } else {
        this.mostrarPanelAdmin = false;
      }
    }
    if (this.rol.hasOwnProperty('roles')) {
      const role = this.rol.roles.find(elem => {
        return elem._id === this.roles.Administrador || elem._id === this.roles.Entidad;
      });
      if (role) {
        this.mostrarEntidad = true;
      } else {
        this.mostrarEntidad = false;
      }
    }
  }

}
