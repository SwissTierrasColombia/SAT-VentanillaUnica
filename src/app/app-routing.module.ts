import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VuComponent } from './sections/vu/vu.component';
import { VuModule } from './sections/vu/vu.module';


const routes: Routes = [
/*   {
    path: '',
    component: VuComponent
  } */
  { path: 'home', loadChildren: './sections/vu/vu.module#VuModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), VuModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
