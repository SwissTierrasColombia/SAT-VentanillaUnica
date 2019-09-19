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

// Guards
import { RoleEntityGuard } from '../../guards/role-entity-guard.service';
import { AuthGuard } from '../../guards/auth-guard.service';


const routes: Routes = [{
  path: 'tramites',
  component: MainLayoutComponent,
  canActivate: [AuthGuard],
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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProcedureRoutingModule { }
