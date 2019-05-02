import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from "@angular/common"
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';

@NgModule({
  imports: [
    FormsModule,
    MainPageRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    MainPageComponent
  ]
})
export class MainPageModule { }
