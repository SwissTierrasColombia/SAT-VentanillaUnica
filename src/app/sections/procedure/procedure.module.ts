import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Libraries
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Routing
import { ProcedureRoutingModule } from './procedure-routing.module';

// Components
import { RoreComponent } from './rore/rore.component';
import { ListComponent } from './list/list.component';
import { StartProcedureComponent } from './start-procedure/start-procedure.component';

@NgModule({
  declarations: [
    RoreComponent,
    ListComponent,
    StartProcedureComponent
  ],
  imports: [
    CommonModule,
    ProcedureRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ProcedureModule { }
