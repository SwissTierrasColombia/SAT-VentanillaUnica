// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Theme Routing
import { ProceduresRoutingModule } from './procedures-routing.module';
import { FormsModule } from '@angular/forms';
import { ProcedureRequestComponent } from './procedure-request/procedure-request.component';
import { ProcedureManagementComponent } from './procedure-managment/procedure-management.component';
import { RegistroObjEspecialComponent } from '../tramites/registro-obj-especial/registro-obj-especial.component';
import { DialogBoxRegistroComponent } from '../../components/dialog-box-registro/dialog-box-registro.component';



@NgModule({
  declarations: [
    ProcedureRequestComponent,
    ProcedureManagementComponent,
    RegistroObjEspecialComponent,
    DialogBoxRegistroComponent
  ],
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    FormsModule
  ]

})
export class ProceduresModule { }
