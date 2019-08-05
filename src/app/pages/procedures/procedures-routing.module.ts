import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcedureRequestComponent } from './procedure-request/procedure-request.component';
import { ProcedureManagementComponent } from './procedure-managment/procedure-management.component';
import { RegistroObjEspecialComponent } from '../tramites/registro-obj-especial/registro-obj-especial.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Trámites'
    },
    children: [
      {
        path: '',
        redirectTo: ''
      },
      {
        path: 'procedure-request',
        component: ProcedureRequestComponent,
        data: {
          title: 'Solicitud de Trámite'
        }
      },
      {
        path: 'procedure-management',
        component: ProcedureManagementComponent,
        data: {
          title: 'Gestión de Trámites'
        }
      },
      {
        path: 'registro',
        component: RegistroObjEspecialComponent,
        data: {
          title: 'Registro de Objeto de Régimen Especial'
        }
      }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProceduresRoutingModule {}
