import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    MainLayoutComponent,
    MainHeaderComponent,
    MainFooterComponent,
    SidebarLeftComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ]
})
export class LayoutModule { }
