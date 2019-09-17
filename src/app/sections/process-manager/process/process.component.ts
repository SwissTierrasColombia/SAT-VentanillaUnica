import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MProcessesService } from 'src/app/services/process-manager/m-processes.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  listaprocesos = true;
  updateprocess = false;
  process = []
  nomProcessCreate: string;
  desProcessCreate: string;
  ipProcessUpdate: string;
  dataUpdate: any;
  constructor(
    private services: MProcessesService,
    private toastr: ToastrService,
    private route: Router
  ) { }

  ngOnInit() {
    this.services.GetProcesos().subscribe(
      response => {
        for (let i in response) {
          this.process.push({
            process: response[i]
          })
        }
        // console.log("response get this.procesos: ", this.process);
      }
    );
  }

  viewProcess() {
    this.listaprocesos = false;
  }

  CreateProcess() {
    const data = {
      processName: this.nomProcessCreate,
      processDescription: this.desProcessCreate
    };
    this.services.CreateProcess(data).subscribe(
      (dataServer: any) => {
        this.process.push({ process: dataServer });
        this.listaprocesos = true;
        this.toastr.success('Haz registrado el proceso: ' + this.nomProcessCreate);
      }
    );
  }

  volver() {
    this.listaprocesos = true;
    this.updateprocess = false;
  }

  ConfigProcess(id: string, name: string) {
    // const nameProcess = name;
    this.route.navigate(['gestor-procesos/procesos/' + id + '/configuracion/']);
  }

  viewupdateProcess(nomProcess: string, id: number) {
    this.updateprocess = true;
    this.nomProcessCreate = nomProcess;
    this.ipProcessUpdate = this.process[id].process._id;
  }
  updateProcess() {
    this.dataUpdate = {
      process: this.ipProcessUpdate,
      processName: this.nomProcessCreate,
      processDescription: this.desProcessCreate
    }
    this.services.UpdateaProcess(this.ipProcessUpdate, this.dataUpdate).subscribe(
      response => {
        setTimeout(function () { window.location.reload(); }, 1000);
        this.toastr.success('Has actualizado un proceso');
      }
    )
  }

  deleteProcess(idProcess: string, id) {
    this.services.RemoveaProcess(idProcess).subscribe(
      paramName => {
        this.toastr.success('Se a eliminado un proceso');
        this.process.splice(id, 1);
      });
  }

  Deploy(idProcess: string, status: boolean, item: any) {

    if (status) {

      this.services.UndeployProcess(idProcess).subscribe(
        data => {
          this.toastr.success('El proceso ha quedado desactivado');
          item.process.active = false;
        },
        _ => {
          item.process.active = false;
        });

    } else {

      this.services.DeployProcess(idProcess).subscribe(
        data => {
          this.toastr.success('El proceso ha quedado activado');
          item.process.active = true;
        },
        _ => {
          item.process.active = false;
        });
    }


  }

}
