import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
//Routing
import { AuthRoutingModule } from './auth-routing.module';
// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
