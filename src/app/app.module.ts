import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//Modules
import { LayoutModule } from './layouts/layout.module';
import { AuthModule } from './sections/auth/auth.module';
import { HomeModule } from './sections/home/home.module';
import { ConsultModule } from './sections/consult/consult.module';
import { ProcedureModule } from './sections/procedure/procedure.module';
import { ProcessManagerModule } from './sections/process-manager/process-manager.module';

//routing
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    HomeModule,
    ConsultModule,
    ProcedureModule,
    ProcessManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
