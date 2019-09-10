import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { RoreComponent } from './rore/rore.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step5Component } from './step5/step5.component';


const routes: Routes = [{
  path: 'tramites',
  component: MainLayoutComponent,
  children: [
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
