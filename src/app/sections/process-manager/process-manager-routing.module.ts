import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { ProcessComponent } from './process/process.component';
import { ConfigProcessComponent } from './config-process/config-process.component';
import { ConfigStepsComponent } from './config-steps/config-steps.component';
import { ConfigStepRolesComponent } from './config-step-roles/config-step-roles.component';
import { ConfigStepRulesComponent } from './config-step-rules/config-step-rules.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { RoleAdminGuard } from 'src/app/guards/role-admin-guard.service';


const routes: Routes = [{
  path: 'gestor-procesos',
  component: MainLayoutComponent,
  canActivate: [AuthGuard, RoleAdminGuard],
  children: [
    {
      path: 'procesos', component: ProcessComponent
    },
    {
      path: 'procesos/:idProceso/configuracion', component: ConfigProcessComponent
    },
    {
      path: 'procesos/:idProceso/step/:idStep/:nameStep/configuracion', component: ConfigStepsComponent
    },
    {
      path: 'procesos/:idProceso/step/:idStep/:nameStep/config/rules', component: ConfigStepRulesComponent
    },
    {
      path: 'procesos/:idProceso/step/:idStep/:nameStep/config/roles', component: ConfigStepRolesComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProcessManagerRoutingModule { }
