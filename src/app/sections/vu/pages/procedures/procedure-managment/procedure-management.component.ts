import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'procedure-management.component.html'
})
export class ProcedureManagementComponent implements OnInit {
  constructor(private route: Router) { }
  ngOnInit(): void {
    if (!sessionStorage.getItem('access_token')) {
      this.route.navigate(['inicio']);
    }
  }

}