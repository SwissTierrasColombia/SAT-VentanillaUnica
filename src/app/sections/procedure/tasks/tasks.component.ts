import { Component, OnInit } from '@angular/core';

// Services
import { UsersService } from '../../../services/user/users.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public processes: Array<any>;

  constructor(
    public userService: UsersService
  ) {
    this.processes = [];
  }

  ngOnInit() {
    this.getTasksPending();
  }

  getTasksPending() {
    this.userService.getTasksProcedures().subscribe(
      (data: any) => {
        this.processes = data.body;
      }
    );
  }

}
