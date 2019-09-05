import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';

@NgModule({
  imports: [
    FormsModule,
    MainPageRoutingModule,  
    CommonModule
  ],
  declarations: [
    MainPageComponent
  ]
})
export class MainPageModule { }
