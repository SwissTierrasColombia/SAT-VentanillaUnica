import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MProcessesService } from 'src/app/services/process-manager/m-processes.service';
import { MStepsService } from 'src/app/services/process-manager/m-steps.service';
import { PDomainsService } from 'src/app/services/process-manager/p-domains.service';
import { RolesService } from 'src/app/services/vu/roles.service';
import { EntitiesService } from 'src/app/services/vu/entities.service';

@Component({
  selector: 'app-config-step-roles',
  templateUrl: './config-step-roles.component.html',
  styleUrls: ['./config-step-roles.component.scss']
})
export class ConfigStepRolesComponent implements OnInit {
  idStep: string;
  idProcess: string;
  nameStep: string;
  stepRoles: any;
  allSteps: any;
  idStepSelect: any;
  entidades: any;
  entidad: any;
  selectEntidad: string;

  constructor(
    private servicesMProcesses: MProcessesService,
    private serviceMSteps: MStepsService,
    private servicesPDomains: PDomainsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private serviceRoles: RolesService,
    private serviceEntities: EntitiesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (response: any) => {
        this.idStep = response.idStep;
        this.idProcess = response.idProceso;
        this.nameStep = response.nameStep;
        //console.log("route response", response);
      }
    );
    let promise1 = new Promise((resolve) => {
      this.serviceRoles.GetRoles().subscribe(
        response => {
          this.stepRoles = response;
          for (let i in this.stepRoles) {
            this.stepRoles[i].status = false;
          }
          //console.log("this.roles: ", this.stepRoles);
          resolve()
        }
      );
    });
    let promise2 = new Promise((resolve) => {
      this.servicesMProcesses.GetStepsProcess(this.idProcess).subscribe(
        data => {
          this.allSteps = data;
          this.idStepSelect = this.allSteps.find((item) => {
            return item.typeStep._id == this.idStep;
          })
          resolve()
        }
      );
    });
    let promise3 = new Promise((resolve) => {
      this.serviceEntities.GetEntities().subscribe(
        data => {
          this.entidades = data;
          for (let i in this.entidades) {
            this.entidades[i].status = false;
          }
          resolve()
        }
      );
    })
    Promise.all([promise1, promise2, promise3]).then(values => {
      //console.log("this.idStepSelect: ", this.idStepSelect);
      this.idStepSelect.roles.find((item) => {
        this.stepRoles.filter(rol => {
          if (rol._id === item) {
            rol.status = true;
          }
        })
      })
      //console.log("ROl: ", this.stepRoles);
      this.entidades.filter(entity => {
        if (entity._id === this.idStepSelect.entity) {
          entity.status = true;
        }
      });
      this.entidad = this.entidades.find(item => {
        return item.status == true;
      })
      if (this.entidad) {
        this.selectEntidad = this.entidad._id;
      }
      //console.log(this.entidad);
    });
  }
  volver() {
    this.router.navigate(['gestor-procesos/procesos/' + this.idProcess + '/configuracion/']);
  }
  addRolToStep(rol: any, status: boolean) {
    //console.log("rol: ", rol, " Estado: ", status);
    if (status === false) {
      let data = {
        'role': rol._id
      }
      this.serviceMSteps.AddRoleToStep(this.idStepSelect._id, data).subscribe(
        data => {
          //console.log(data);
          this.toastr.success("Se a agregado el Rol")
        }
      )
    } else if (status === true) {
      this.serviceMSteps.RemoveRoleToStep(this.idStepSelect._id, rol._id).subscribe(
        data => {
          this.toastr.info("Se a eliminado el Rol")
        }
      )
    }
  }
  addEntity() {
    this.serviceMSteps.SetEntityToStep(this.idStepSelect._id, this.selectEntidad).subscribe(
      data => {
        //console.log("data: ", data);
        this.toastr.success("Se a agregado la entidad al paso: " + this.nameStep)
      }
    )
  }
}
