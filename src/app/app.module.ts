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
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
