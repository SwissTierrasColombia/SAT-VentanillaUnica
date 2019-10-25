import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';

@NgModule({
  entryComponents: [
    MapComponent
  ],
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [CommonModule]
})
export class ComponentsModule { }
