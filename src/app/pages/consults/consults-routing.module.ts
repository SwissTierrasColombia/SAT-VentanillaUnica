import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicParcelInfoComponent } from './basic-parcel-info/basic-parcel-info.component';
import { InstitutionalParcelInfoComponent } from './institutional-parcel-info/institutional-parcel-info.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Consultas'
    },
    children: [
      {
        path: '',
        redirectTo: 'basic-parcel-info'
      },
      {
        path: 'basic-parcel-info',
        component: BasicParcelInfoComponent,
        data: {
          title: 'Consulta General'
        }
      },
      {
        path: 'institutional-parcel-info',
        component: InstitutionalParcelInfoComponent,
        data: {
          title: 'Consulta Institucional'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultsRoutingModule {}
