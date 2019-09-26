import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/vu/roles.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {
  roles: any;
  constructor(
    private serviceRoles: RolesService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.serviceRoles.GetRoles().subscribe(
      data => {
        this.roles = data;
      }
    )
  }
  createRole() {
    this.route.navigate(['/roles/nuevo']);
  }
  updateRol(item: any) {
    this.route.navigate(['/roles/actualizar/' + item._id + '/' + item.role]);
  }

}
