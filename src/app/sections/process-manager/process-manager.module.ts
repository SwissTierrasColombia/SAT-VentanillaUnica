import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process/process.component';
import { ProcessManagerRoutingModule } from './process-manager-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProcessComponent],
  imports: [
    CommonModule,
    ProcessManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProcessManagerModule { }
