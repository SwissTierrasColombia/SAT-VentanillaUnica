import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AdministratorUsersService } from 'src/app/services/administrator-users/administrator-users.service';
import { RolesService } from 'src/app/services/vu/roles.service';
import { EntitiesService } from 'src/app/services/vu/entities.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUsersComponent implements OnInit {

  listUsers: Array<{}>;
  paginas: number;
  totalUsers: number;
  page: number;
  limit: number;
  constructor(
    private service: AdministratorUsersService,
    private serviceRoles: RolesService,
    private serviceEntities: EntitiesService,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.page = 1;
    //this.listUsers = [];
    this.limit = 10;
  }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.service.GetUsers('1').subscribe(
      (data: any) => {
        console.log("data: ", data);
        this.listUsers = data.body.docs;
        this.paginas = data.body.page;
        this.totalUsers = data.body.total;
        this.page = data.body.page;
        console.log("this.listUsers: ", this.listUsers);
      }
    );
  }
  changePage(numberPage) {
    console.log("numberPage: ", numberPage);

    /*      this.service.GetUsers(numberPage.toString()).subscribe(
           data => {
             this.listUsers = data.body.docs;
             this.page = data.body.page;
             console.log("this.listUsers: ",this.listUsers);
           }
         ); */
  }
  createUser() {
    this.route.navigate(['/usuarios/nuevo']);
  }
  updateUser(item:any){
    this.route.navigate(['/usuarios/actualizar/'+item._id+'/'+item.username]);
  }
}
