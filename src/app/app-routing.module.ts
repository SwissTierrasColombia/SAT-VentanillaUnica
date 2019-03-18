import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InfoQueriesComponent } from './pages/info-queries/info-queries.component';
import { BasicParcelInfoComponent } from './pages/info-queries/basic-parcel-info/basic-parcel-info.component';
import { InstitutionalParcelInfoComponent } from './pages/info-queries/institutional-parcel-info/institutional-parcel-info.component'
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'consultas', component: InfoQueriesComponent},
  { path: 'consulta-basica', component: BasicParcelInfoComponent},
  { path: 'consulta-institucional', component: InstitutionalParcelInfoComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
