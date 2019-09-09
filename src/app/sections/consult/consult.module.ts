import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { InstitutionalComponent } from './institutional/institutional.component';
import { ConsultRoutingModule } from './consult-routing.module';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';


@NgModule({
  declarations: [GeneralComponent, InstitutionalComponent],
  imports: [
    CommonModule,
    ConsultRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ConsultModule { }
