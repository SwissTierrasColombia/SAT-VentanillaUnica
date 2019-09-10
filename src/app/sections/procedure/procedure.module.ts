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
import { Step1Component } from './step1/step1.component';

// Libraries
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';


@NgModule({
  declarations: [
    RoreComponent,
    UpdateObjectEspecialComponent,
    DialogBoxRegistroComponent,
    Step1Component,
    Step2Component,
    Step3Component
  ],
  imports: [
    CommonModule,
    ProcedureRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ]
})
export class ProcedureModule { }
