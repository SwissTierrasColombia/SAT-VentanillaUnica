import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Libraries
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UpdateObjectEspecialComponent } from './update-object-especial/update-object-especial.component';
import { DialogBoxRegistroComponent } from 'src/app/components/dialog-box-registro/dialog-box-registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing
import { ProcedureRoutingModule } from './procedure-routing.module';

// Components
import { RoreComponent } from './rore/rore.component';
import { ListComponent } from './list/list.component';
import { StartProcedureComponent } from './start-procedure/start-procedure.component';
import { TasksComponent } from './tasks/tasks.component';
import { ManageProcedureComponent } from './manage-procedure/manage-procedure.component';
import { SearchProcedureComponent } from './search-procedure/search-procedure.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step5Component } from './step5/step5.component';
@NgModule({
  declarations: [
    RoreComponent,
    ListComponent,
    StartProcedureComponent,
    TasksComponent,
    ManageProcedureComponent,
    UpdateObjectEspecialComponent,
    DialogBoxRegistroComponent,
    SearchProcedureComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component
  ],
  imports: [
    CommonModule,
    ProcedureRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule
  ]
})
export class ProcedureModule { }
