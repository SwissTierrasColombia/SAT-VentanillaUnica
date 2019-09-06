import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { InstitutionalComponent } from './institutional/institutional.component';
import { ConsultRoutingModule } from './consult-routing.module';



@NgModule({
  declarations: [GeneralComponent, InstitutionalComponent],
  imports: [
    CommonModule,
    ConsultRoutingModule
  ]
})
export class ConsultModule { }
