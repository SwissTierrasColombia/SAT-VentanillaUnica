import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { VuComponent } from './sections/vu/vu.component';
import { PmComponent } from './sections/pm/pm.component';
import { VuModule } from './sections/vu/vu.module';
//libraries
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SidebarLeftComponent } from './layouts/sidebar-left/sidebar-left.component';
import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    // VuComponent,
    PmComponent,
    SidebarLeftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
