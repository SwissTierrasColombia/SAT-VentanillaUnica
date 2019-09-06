import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { ProcessComponent } from './process/process.component';


const routes: Routes = [{
  path: 'gestor-procesos',
  component: MainLayoutComponent,
  children: [
    {
      path: 'procesos', component: ProcessComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProcessManagerRoutingModule { }
