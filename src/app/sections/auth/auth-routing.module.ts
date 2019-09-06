import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [{
  path: 'autenticacion',
  component: AuthLayoutComponent,
  children: [
    {
      path: 'login', component: LoginComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
