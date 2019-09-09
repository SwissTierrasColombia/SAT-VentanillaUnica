import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoreComponent } from './rore/rore.component';
import { ProcedureRoutingModule } from './procedure-routing.module';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { UpdateObjectEspecialComponent } from './update-object-especial/update-object-especial.component';
import { DialogBoxRegistroComponent } from 'src/app/components/dialog-box-registro/dialog-box-registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    RoreComponent,
    UpdateObjectEspecialComponent,
    DialogBoxRegistroComponent
  ],
  imports: [
    CommonModule,
    ProcedureRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class ProcedureModule { }
