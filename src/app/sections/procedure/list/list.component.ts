import { Component, OnInit } from '@angular/core';

// Services
import { MProcessesService } from '../../../services/process-manager/m-processes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public processes: Array<any>;

  constructor(
    public processService: MProcessesService
  ) {
    this.processes = [];
  }

  ngOnInit() {
    this.getProcesses();
  }

  getProcesses() {
    this.processService.getProcessesAvailable().subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.processes = data.body;
        }
      }
    );
  }

}
