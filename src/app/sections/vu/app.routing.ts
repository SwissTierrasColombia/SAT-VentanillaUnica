import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
//import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './pages/login/login.component';
import { VuComponent } from './vu.component';
import { MainPageComponent } from './pages/home/main-page.component';

export const routes: Routes = [
  {
    path: 'vu',
    component: VuComponent,
    children: [
      {
        path: '', component: MainPageComponent
      }
    ]
  },
  /* {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  }, */
/*   {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'inicio',
        loadChildren: './pages/home/main-page.module#MainPageModule'
      },
      {
        path: 'consults',
        loadChildren: './pages/consults/consults.module#ConsultsModule'
      },
      {
        path: 'procedures',
        loadChildren: './pages/procedures/procedures.module#ProceduresModule'
      }
    ]
  }, */
  // { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
