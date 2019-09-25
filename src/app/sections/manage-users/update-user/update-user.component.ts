import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdministratorUsersService } from 'src/app/services/administrator-users/administrator-users.service';
import { RolesService } from 'src/app/services/vu/roles.service';
import { EntitiesService } from 'src/app/services/vu/entities.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  idUser: string;
  registerData = {
    idUser: this.idUser,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmationPassword: "",
    roles: [],
    entities: [],
  }
  username: string;
  roles: any;
  entities: any;
  constructor(
    private service: AdministratorUsersService,
    private serviceRoles: RolesService,
    private serviceEntities: EntitiesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (response: any) => {
        this.idUser=response.idUser;
        this.username = response.userName;
        //console.log(this.idUser);
      }
    );
    this.serviceRoles.GetRoles().subscribe(
      data=>{
        this.roles=data;
        //console.log(this.roles);
      }
    );
    this.serviceEntities.GetEntities().subscribe(
      data=>{
        this.entities=data;
        //console.log(this.entities);
      }
    )
  }
  update(){
    if (this.registerData.password === this.registerData.confirmationPassword) {
      this.service.UpdateUser(this.idUser, this.registerData).subscribe(
        data=>{
          //console.log(data);
          this.toastr.success("Se ha actualizado la cuenta exitosamente.");        
          this.router.navigate(['/usuarios']);
        }
      ); 
    }else{
      this.toastr.show("las contraseñas no coinciden");
    }
  }
  volver() {
    this.router.navigate(['usuarios/']);
  }

}
