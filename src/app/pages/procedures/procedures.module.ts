// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Theme Routing
import { ProceduresRoutingModule } from './procedures-routing.module';
import { FormsModule } from '@angular/forms';
import { ProcedureRequestComponent } from './procedure-request/procedure-request.component';
import { ProcedureManagementComponent } from './procedure-managment/procedure-management.component';

@NgModule({
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    FormsModule

  ],
  declarations: [
    ProcedureRequestComponent,
    ProcedureManagementComponent

  ]
})
export class ProceduresModule { }
