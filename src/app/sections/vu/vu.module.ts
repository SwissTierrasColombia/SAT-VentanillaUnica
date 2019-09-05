import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/home/main-page.component';
import { FormsModule } from '@angular/forms';
import { VuComponent } from './vu.component';
@NgModule({
  declarations: [
    VuComponent,
    LoginComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule

  ]
})
export class VuModule { }
