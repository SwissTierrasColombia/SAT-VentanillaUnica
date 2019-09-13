import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
//Modules
import { LayoutModule } from './layouts/layout.module';
import { AuthModule } from './sections/auth/auth.module';
import { HomeModule } from './sections/home/home.module';
import { ConsultModule } from './sections/consult/consult.module';
import { ProcedureModule } from './sections/procedure/procedure.module';
import { ProcessManagerModule } from './sections/process-manager/process-manager.module';

//routing
import { AppRoutingModule } from './app-routing.module';

//npm
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CollapseModule } from 'ngx-bootstrap/collapse';
//services
import { MProcessesService } from './services/process-manager/m-processes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from './services/interceptors/error-interceptor.service';
import { TokenInterceptor } from './services/interceptors/token-interceptor.service';
import { AuthGuard } from './guards/auth-guard.service';
import { RoleGuard } from './guards/role-guard.service';
import { RoleModel } from './models/role.model';


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
    ProcessManagerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AccordionModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CollapseModule.forRoot()
  ],
  providers: [
    RoleModel,
    AuthGuard,
    RoleGuard,
    MProcessesService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
