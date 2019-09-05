// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BasicParcelInfoComponent } from './basic-parcel-info/basic-parcel-info.component';
import { InstitutionalParcelInfoComponent } from './institutional-parcel-info/institutional-parcel-info.component';

// Theme Routing
import { ConsultsRoutingModule } from './consults-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ConsultsRoutingModule,
    FormsModule
  ],
  declarations: [
    BasicParcelInfoComponent,
    InstitutionalParcelInfoComponent

  ]
})
export class ConsultsModule { }
