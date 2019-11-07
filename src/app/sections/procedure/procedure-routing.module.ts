import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';

// Components
import { RoreComponent } from './rore/rore.component';
import { ListComponent } from './list/list.component';
import { StartProcedureComponent } from './start-procedure/start-procedure.component';
import { TasksComponent } from './tasks/tasks.component';
import { ManageProcedureComponent } from './manage-procedure/manage-procedure.component';
import { SearchProcedureComponent } from './search-procedure/search-procedure.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step5Component } from './step5/step5.component';
// Guards
import { RoleEntityGuard } from '../../guards/role-entity-guard.service';
import { AuthGuard } from '../../guards/auth-guard.service';


const routes: Routes = [{
  path: 'tramites',
  component: MainLayoutComponent,
  //canActivate: [AuthGuard],
  children: [
    {
      path: '', component: ListComponent
    },
    {
      path: 'iniciar/:mProcessId', component: StartProcedureComponent
    },
    {
      path: 'gestionar/:rProcessId', component: ManageProcedureComponent
    },
    {
      path: 'consultar', component: SearchProcedureComponent
    },
    {
      path: 'pendientes', component: TasksComponent
    },
    {
      path: 'registro-especial', component: RoreComponent
    },
    {
      path: 'pot/paso1', component: Step1Component
    },
    {
      path: 'pot/paso2', component: Step2Component
    },
    {
      path: 'pot/paso3', component: Step3Component
    },
    {
      path: 'pot/paso4', component: Step4Component
    },
    {
      path: 'pot/paso5', component: Step5Component
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProcedureRoutingModule { }
