import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VuComponent } from './sections/vu/vu.component';
import { PmComponent } from './sections/pm/pm.component';
import { VuModule } from './sections/vu/vu.module';
//libraries
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    VuComponent,
    PmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VuModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
