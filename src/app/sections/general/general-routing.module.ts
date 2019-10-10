import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MapOpenLayerComponent } from './map-open-layer/map-open-layer.component';


const routes: Routes = [{
  path: 'error',
  component: MainLayoutComponent,
  children: [
    {
      path: 'not-found', component: NotFoundComponent
    },
    {
      path: 'ol', component: MapOpenLayerComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
