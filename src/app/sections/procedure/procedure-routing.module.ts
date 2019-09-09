import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';

// Components
import { RoreComponent } from './rore/rore.component';
import { ListComponent } from './list/list.component';
import { StartProcedureComponent } from './start-procedure/start-procedure.component';


const routes: Routes = [{
  path: 'tramites',
  component: MainLayoutComponent,
  children: [
    {
      path: '', component: ListComponent
    },
    {
      path: ':mProcessId', component: StartProcedureComponent
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
