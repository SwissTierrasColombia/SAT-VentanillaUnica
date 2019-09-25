import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';


const routes: Routes = [{
  path: 'usuarios',
  component: MainLayoutComponent,
  children: [
    {
      path: '', component: ListUsersComponent,
    },
    {
      path: 'nuevo', component: CreateUserComponent,
    },
    {
      path: 'actualizar/:idUser/:userName', component: UpdateUserComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
