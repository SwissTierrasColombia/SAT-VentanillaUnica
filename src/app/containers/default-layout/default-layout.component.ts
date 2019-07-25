import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { LoginService } from 'src/app/services/login/login.service'
import { TokenJwt } from 'src/app/models/token-jwt.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {
  public ver = sessionStorage.getItem("access_token");
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  token: TokenJwt;
  id: Number;
  constructor(private serviceLogin: LoginService, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  ngOnInit() {
    if (sessionStorage.getItem("access_token") != null) {
      this.token = JSON.parse(atob(sessionStorage.getItem('access_token').split('.')[1]))
      for (let index = 0; index < this.token.realm_access.roles.length; index++) {
        if (this.token.realm_access.roles[index] === 'Entidad1') {
          this.id = 1
        } else if (this.token.realm_access.roles[index] === 'Entidad2') {
          this.id = 2
        } else if (this.token.realm_access.roles[index] === 'Entidad3') {
          this.id = 3
        } else if (this.token.realm_access.roles.length == index + 1) {
          this.id = 0
        }

      }
    }

  }
  logout() {
    this.serviceLogin.logout();
    window.location.reload()
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
