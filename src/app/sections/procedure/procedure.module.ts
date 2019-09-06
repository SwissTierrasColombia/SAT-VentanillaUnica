import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoreComponent } from './rore/rore.component';
import { ProcedureRoutingModule } from './procedure-routing.module';



@NgModule({
  declarations: [RoreComponent],
  imports: [
    CommonModule,
    ProcedureRoutingModule
  ]
})
export class ProcedureModule { }
