import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { GeneralComponent } from './general/general.component';
import { InstitutionalComponent } from './institutional/institutional.component';
import { RoleEntityGuard } from 'src/app/guards/role-entity-guard.service';



const routes: Routes = [{
  path: 'consultas',
  component: MainLayoutComponent,
  children: [
    {
      path: 'general', component: GeneralComponent
    },
    {
      path: 'institucional', component: InstitutionalComponent, canActivate: [RoleEntityGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConsultRoutingModule { }
