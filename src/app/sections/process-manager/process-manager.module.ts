import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process/process.component';
import { ProcessManagerRoutingModule } from './process-manager-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigProcessComponent } from './config-process/config-process.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ConfigStepsComponent } from './config-steps/config-steps.component';
import { ConfigStepRulesComponent } from './config-step-rules/config-step-rules.component';
import { ConfigStepRolesComponent } from './config-step-roles/config-step-roles.component';
import { TypeDataFieldModel } from 'src/app/models/typeDataField.model';
import { CallbacksModel } from 'src/app/models/callbacks.model';
import { TooltipModule } from 'ng2-tooltip-directive';


@NgModule({
  declarations: [
    ProcessComponent,
    ConfigProcessComponent,
    ConfigStepsComponent,
    ConfigStepRulesComponent,
    ConfigStepRolesComponent
  ],
  imports: [
    CommonModule,
    ProcessManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGraphModule,
    TooltipModule
  ],
  providers: [
    TypeDataFieldModel,
    CallbacksModel
  ],
})
export class ProcessManagerModule { }
