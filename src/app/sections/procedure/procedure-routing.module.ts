import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { RoreComponent } from './rore/rore.component';


const routes: Routes = [{
  path: 'tramites',
  component: MainLayoutComponent,
  children: [
    {
      path: 'registro-especial', component: RoreComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProcedureRoutingModule { }
