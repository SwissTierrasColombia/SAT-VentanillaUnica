import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InfoQueriesComponent } from './pages/info-queries/info-queries.component';
import { BasicParcelInfoComponent } from './pages/info-queries/basic-parcel-info/basic-parcel-info.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'consultas', component: InfoQueriesComponent},
  { path: 'consulta-basica', component: BasicParcelInfoComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
