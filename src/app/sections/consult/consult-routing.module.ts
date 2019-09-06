import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { GeneralComponent } from './general/general.component';
import { InstitutionalComponent } from './institutional/institutional.component';



const routes: Routes = [{
  path: 'consultas',
  component: MainLayoutComponent,
  children: [
    {
      path: 'general', component: GeneralComponent
    },
    {
      path: 'institucional', component: InstitutionalComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConsultRoutingModule { }
