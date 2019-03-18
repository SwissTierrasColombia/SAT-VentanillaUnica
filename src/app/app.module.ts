import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoQueriesComponent } from './pages/info-queries/info-queries.component';
import { BasicParcelInfoComponent } from './pages/info-queries/basic-parcel-info/basic-parcel-info.component';
import { HttpClientModule } from '@angular/common/http';
import { InstitutionalParcelInfoComponent } from './pages/info-queries/institutional-parcel-info/institutional-parcel-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoQueriesComponent,
    BasicParcelInfoComponent,
    InstitutionalParcelInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
