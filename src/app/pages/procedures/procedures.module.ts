// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Theme Routing
import { ProceduresRoutingModule } from './procedures-routing.module';
import { FormsModule } from '@angular/forms';
import { ProcedureRequestComponent } from './procedure-request/procedure-request.component';
import { ProcedureManagementComponent } from './procedure-managment/procedure-management.component';
import { RegistroObjEspecialComponent } from '../tramites/registro-obj-especial/registro-obj-especial.component';
import { DialogBoxComponent } from '../tramites/registro-obj-especial/dialog-box/dialog-box.component';


@NgModule({
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    FormsModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  declarations: [
    ProcedureRequestComponent,
    ProcedureManagementComponent,
    RegistroObjEspecialComponent,
    DialogBoxComponent
  ]
})
export class ProceduresModule { }
