import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { ProcessComponent } from './process/process.component';
import { ConfigProcessComponent } from './config-process/config-process.component';
import { ConfigStepsComponent } from './config-steps/config-steps.component';

import { ConfigStepRulesComponent } from './config-step-rules/config-step-rules.component';


const routes: Routes = [{
  path: 'gestor-procesos',
  component: MainLayoutComponent,
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
      path: 'procesos/:idProceso/step/:idStep/:nameStep/config/rules', component: ConfigStepsComponent
    },
    {
      path: 'procesos/:idProceso/step/:idStep/:nameStep/config/roles', component: ConfigStepRulesComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProcessManagerRoutingModule { }
