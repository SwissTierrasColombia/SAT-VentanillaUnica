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
import { 
  MatTableModule, 
  MatDialogModule, 
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';


@NgModule({
  declarations: [
    ProcedureRequestComponent,
    ProcedureManagementComponent,
    RegistroObjEspecialComponent,
    DialogBoxComponent
  ],
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule
  ],
  entryComponents: [
    DialogBoxComponent
  ]

})
export class ProceduresModule { }
