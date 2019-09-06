import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process/process.component';
import { ProcessManagerRoutingModule } from './process-manager-routing.module';



@NgModule({
  declarations: [ProcessComponent],
  imports: [
    CommonModule,
    ProcessManagerRoutingModule
  ]
})
export class ProcessManagerModule { }
