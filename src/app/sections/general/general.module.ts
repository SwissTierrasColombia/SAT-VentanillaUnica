import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralRoutingModule } from './general-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { MapOpenLayerComponent } from './map-open-layer/map-open-layer.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    MapOpenLayerComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MapOpenLayerComponent
  ]
})
export class GeneralModule { }
