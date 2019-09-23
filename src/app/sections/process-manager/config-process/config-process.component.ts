import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MStepsService } from 'src/app/services/process-manager/m-steps.service';
import { PStepsService } from 'src/app/services/process-manager/p-steps.service';
import { MProcessesService } from 'src/app/services/process-manager/m-processes.service';
import { EntitiesService } from 'src/app/services/vu/entities.service';

@Component({
  selector: 'app-config-process',
  templateUrl: './config-process.component.html',
  styleUrls: ['./config-process.component.scss']
})
export class ConfigProcessComponent implements OnInit {

  idProcess: any;
  tab = 1;
  steps = [];
  roles: any;
  stepsProcess: any;
  nomRolCreate: any;
  actualizarRol = false;
  idRolupdate: string;
  allstepsSelect: any;
  idStepSelect: any;
  actualizarVariable = false;
  variables: any;
  nomVariableCreate: string;
  valorVariableCreate: string;
  idVariableupdate: string;
  actualizarUsuario = false;
  firstName: string;
  lastName: string;
  username: string;
  usuarios: any;
  userRoles: any;
  idUserRol: string;
  userRolesUpdate: any;
  flowSteps: any;
  firstStep = false;
  entidades: any;
  constructor(
    private servicesMProcesses: MProcessesService,
    private servicesPSteps: PStepsService,
    private serviceMSteps: MStepsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private servicesEntities: EntitiesService,
    /*     private node: Node,
        private edge: Edge,
        private clusterNode: ClusterNode */
  ) { }

  ngOnInit() {
    let promise1 = new Promise((resolve) => {
      this.route.params.subscribe(
        (response: any) => {
          this.idProcess = response.idProceso;
          resolve();
        }
      );
    });
    let promise2 = new Promise((resolve) => {
      this.servicesPSteps.GetSteps().subscribe(
        response => {
          for (let i in response) {
            this.steps.push({
              "step": response[i],
              "status": false,
              "isFirst": false
            })
          }
          resolve();
        }
      );
    });
    let promise3 = new Promise((resolve) => {
      this.servicesMProcesses.GetRolesProcess(this.idProcess).subscribe(
        response => {
          this.roles = response;
          this.userRoles = this.clone(this.roles)
          for (let i in this.userRoles) {
            this.userRoles[i].status = false;
          }
          //console.log("this.roles: ", this.roles);
          resolve();
        }
      );
    });
    let promise4 = new Promise((resolve) => {
      this.servicesMProcesses.GetStepsProcess(this.idProcess).subscribe(
        response => {
          this.stepsProcess = response;
          //console.log("stepsProcess: ", this.stepsProcess);

          let self = this;
          this.steps = this.steps.map(function (variable, index, array) {
            if (self.stepsProcess.find((elem: any) => elem.typeStep._id == variable.step._id)) {
              variable.status = true;
            }
            return variable
          });
          this.stepsProcess.forEach(item => {
            //console.log("item: ", item);
            if (item.isFirst) {
              this.steps.find(elem => {
                if (item.typeStep._id == elem.step._id) {
                  return elem.isFirst = true;
                }
              });
            }
          });
          resolve();
        });
    });
    let promise5 = new Promise((resolve) => {
      this.servicesMProcesses.GetVariablesFromProcess(this.idProcess).subscribe(
        response => {
          this.variables = response;
          resolve();
        });
    });
    let promise6 = new Promise((resolve) => {
      this.servicesMProcesses.GetUsersToProcess(this.idProcess).subscribe(
        data => {
          this.usuarios = data;
          for (let i in this.usuarios) {
            for (let j in this.usuarios[i].roles) {
              this.usuarios[i].roles[j].status = true;
            }
          }
          //console.log("this.usuarios: ", this.usuarios);
          resolve();
        });
    });
    let promise7 = new Promise((resolve) => {
      this.servicesEntities.GetEntities().subscribe(
        data => {
          this.entidades = data;
          for (let i in this.entidades) {
            this.entidades[i].status = false;
          }
          //console.log('this.entidades', this.entidades);
          this.servicesMProcesses.GetProcesos().subscribe(
            data => {
              //console.log("Procesos: ", data);
              let proceso = data.find(item => {
                return item._id === this.idProcess;
              })
              proceso.entities.find((item) => {
                this.entidades.filter(entity => {
                  if (entity._id === item) {
                    entity.status = true;
                  }
                });
              });
              resolve();
            }
          )
        }
      );
    });
    let promise8 = new Promise((resolve) => {
      this.servicesMProcesses.GetStepsFlow(this.idProcess).subscribe(
        data => {
          this.flowSteps = data;
          //console.log(this.flowSteps.nodes);
          resolve();
        }
      );
    });
    Promise.all([promise1, promise2, promise3,promise4, promise5, promise6, promise7, promise8]).then(values => {
    });

  }//fin init

  addVariableProcess() {
    let data = {
      "process": this.idProcess,
      "variable": this.nomVariableCreate,
      "value": this.valorVariableCreate
    }
    this.servicesMProcesses.AddVariableToProcess(this.idProcess, data).subscribe(
      Response => {
        this.variables = Response;
        this.toastr.success("Se a registrado la variable al proceso.")
      }
    )
    this.nomVariableCreate = '';
    this.valorVariableCreate = '';
  }

  configVariable(idvariable: string, id: number) {
    this.actualizarVariable = true;
    this.nomVariableCreate = this.variables[id].variable;
    this.valorVariableCreate = this.variables[id].value;
    this.idVariableupdate = idvariable;
  }
  updateVariableProcess() {
    let data = {
      "process": this.idProcess,
      "variable": this.idVariableupdate,
      "name": this.nomVariableCreate,
      "value": this.valorVariableCreate
    }
    this.servicesMProcesses.UpdateVariablesFromProcess(this.idProcess, this.idVariableupdate, data).subscribe(
      data => {
        this.variables = data;
        this.toastr.success("Haz Actualizado la variable: " + this.nomVariableCreate);
        this.nomVariableCreate = "";
        this.idVariableupdate = "";
        this.valorVariableCreate = "";
        this.actualizarVariable = false;
      }
    );
  }
  deleteVariable(idVariable: string, id: number) {
    this.servicesMProcesses.RemoveVariableFromProcess(this.idProcess, idVariable).subscribe(
      response => {
        this.toastr.success("Haz Eliminado una variable");
        this.variables.splice(id, 1)
      }
    )
  }
  clone(obj: Object) {
    return JSON.parse(JSON.stringify(obj))
  }
  addColorstep(id: number) {
    if (this.steps[id].status) {
      this.steps[id].status = false;
    } else {
      this.steps[id].status = true
    }
  }
  addstepsProcess() {
    //console.log("stepsProcess: ", this.stepsProcess);

    let auxAllStep = this.clone(this.steps)
    let auxSteps: any
    let promise1 = new Promise((resolve, reject) => {
      auxSteps = auxAllStep.filter(step => step.status == true)
      resolve()
    });
    let temp: any
    let promise2 = new Promise((resolve, reject) => {
      let self = this;
      temp = auxAllStep.map(function (item, index, array) {
        if (self.stepsProcess.find((elem: any) => elem.typeStep._id == item.step._id)) {
          item.status = false;
        } else {
          item.status = true;
        }
        return item
      })
      //console.log("temp", temp);
      resolve()
    });
    Promise.all([promise1, promise2]).then(values => {
      //let aux = auxAllStep.filter(step => step.status == true)
      //auxStepsNew = auxSteps.filter(step => step.status == true)
      //console.log("auxSteps: ", auxSteps);
      let array = []
      for (let i in auxSteps) {
        if (auxSteps[i].status) {
          array.push(auxSteps[i])
        }
      }
      console.log(array);
      let promise1 = new Promise((resolve, reject) => {
        let self = this;
        array.map(function (variable) {
          self.servicesMProcesses.AddStepProcess(self.idProcess, variable.step._id).subscribe(
            data => {
              self.toastr.success("Haz registrado el step: " + variable.step.step);
            }
          );
        });
        resolve()
      });
      Promise.all([promise1]).then(values => {
        setTimeout(function () { window.location.reload(); }, 1000);

      });
    });
  }
  addstepsProcess2() {
    //console.log("stepsProcess: ", this.stepsProcess);

    let auxAllStep = this.clone(this.steps)
    let auxSteps: any
    let promise1 = new Promise((resolve, reject) => {
      auxSteps = auxAllStep.filter(step => step.status == true)
      resolve()
    });
    let temp: any
    let promise2 = new Promise((resolve, reject) => {
      let self = this;
      temp = auxAllStep.map(function (item, index, array) {
        if (self.stepsProcess.find((elem: any) => elem.typeStep._id == item.step._id)) {
          item.status = false;
        } else {
          item.status = true;
        }
        return item
      })
      //console.log("temp", temp);
      resolve()
    });
    Promise.all([promise1, promise2]).then(values => {
      //let aux = auxAllStep.filter(step => step.status == true)
      //auxStepsNew = auxSteps.filter(step => step.status == true)
      //console.log("auxSteps: ", auxSteps);
      let array = []
      for (let i in auxSteps) {
        if (auxSteps[i].status) {
          array.push(auxSteps[i])
        }
      }
      console.log(array);
      let promise1 = new Promise((resolve, reject) => {
        let self = this;
        array.map(function (variable) {
          self.servicesMProcesses.AddStepProcess(self.idProcess, variable.step._id).subscribe(
            data => {
              self.toastr.success("Haz registrado el step: " + variable.step.step);
            }
          );
        });
        resolve()
      });
      Promise.all([promise1]).then(values => {
        //setTimeout(function () { window.location.reload(); }, 1000);
      });
    });
  }
  configStepRoles(idStep: string, nameStep: string, id) {
    console.log("configStepRoles");
    //console.log(this.stepsProcess[id]);
    if (this.steps[id].status) {
      //this.addstepsProcess2();
      this.router.navigate(['gestor-procesos/procesos/' + this.idProcess + '/step/' + idStep + '/' + nameStep + '/config/roles']);
    } else {
      this.toastr.info("Al parecer no haz agregado este paso al proceso", "Por favor agregalo primero.")
    }
  }
  configStep(idStep: string, nameStep: string, id) {
    console.log(this.stepsProcess[id]);
    if (this.steps[id].status) {
      this.addstepsProcess2();
      this.router.navigate(['gestor-procesos/procesos/' + this.idProcess + '/step/' + idStep + '/' + nameStep + '/configuracion/']);
    } else {
      this.toastr.info("Al parecer no haz agregado este paso al proceso", "Por favor agregalo primero.")
    }

  }
  configRules(idStep: string, nameStep: string, id) {
    //console.log(this.stepsProcess[id]);
    if (this.steps[id].status) {
      this.addstepsProcess2();
      this.router.navigate(['gestor-procesos/procesos/' + this.idProcess + '/step/' + idStep + '/' + nameStep + '/config/rules']);
    } else {
      this.toastr.info("Al parecer no haz agregado este paso al proceso", "Por favor agregalo primero.")
    }

  }
  deleteStep(idstepOne: string, idColor: number) {
    let id = idstepOne
    this.steps[idColor].status = false
    this.servicesMProcesses.GetStepsProcess(this.idProcess).subscribe(
      response => {
        this.allstepsSelect = response;
        this.idStepSelect = this.allstepsSelect.find((item) => {
          return item.typeStep._id == id;
        })
        if (this.idStepSelect) {
          this.servicesMProcesses.RemoveStepToProcess(this.idProcess, this.idStepSelect._id).subscribe(
            response => {
              this.toastr.success("Se a eliminado un Step");
              this.getFlow();
            }
          );
        } else {
          this.toastr.show("Probablemente no a guardado ese Step, No se puede eliminar")
        }
      });
    this.idStepSelect = '';
  }
  configRol(idRol: string, id: number) {
    //console.log("idRol: ", idRol, " id: ", id);
    this.actualizarRol = true;
    this.nomRolCreate = this.roles[id].role
    this.idRolupdate = idRol;
    //this.updateRolProcess(this.idProcess, idRol, this.nomRolCreate);
  }
  deleteRol(idRol: string, id) {

    this.servicesMProcesses.RemoveRoleFromProcess(this.idProcess, idRol).subscribe(
      response => {
        this.toastr.success("Haz Eliminado un rol");
        this.roles.splice(id, 1)
      }
    )
  }
  updateRolProcess() {
    this.servicesMProcesses.UpdateRolProcess(this.idProcess, this.idRolupdate, this.nomRolCreate).subscribe(
      data => {
        this.roles = data;
        this.toastr.success("Haz Actualizado el rol: " + this.nomRolCreate);
        this.nomRolCreate = "";
        this.idRolupdate = "";
        this.actualizarRol = false;
      }
    );
  }
  addRolProcess() {
    this.servicesMProcesses.AddRolProcess(this.idProcess, this.nomRolCreate).subscribe(
      data => {
        this.roles = data;
        this.toastr.success("Haz registrado el rol: " + this.nomRolCreate);
        this.nomRolCreate = "";
      }
    );
  }
  volver() {
    this.router.navigate(['gestor-procesos/procesos/']);
  }
  configUser(idUser: string, i: number) {
    this.idUserRol = idUser;
    this.username = this.usuarios[i].username;
    this.firstName = this.usuarios[i].firstName;
    this.lastName = this.usuarios[i].lastName;
    this.actualizarUsuario = true
    this.userRolesUpdate = this.clone(this.userRoles)
    let auxRolesActivos = this.usuarios[i].roles
    for (let j in this.userRolesUpdate) {
      const temp = auxRolesActivos.find(item => {
        return item._id.toString() === this.userRolesUpdate[j]._id.toString();
      });
      if (temp) {
        this.userRolesUpdate[j].status = true
      }
    }
  }
  deleteUser(idUser: string, i: number) {
    this.servicesMProcesses.RemoveUserFromProcess(this.idProcess, idUser).subscribe(
      data => {
        this.toastr.success("Se a eliminado un usuario")
        this.usuarios.splice(i, 1)
      }
    )
  }
  addUserProcess() {
    let verificarRoles = this.clone(this.userRoles)
    verificarRoles = verificarRoles.filter(item => {
      return item.status === true;
    })
    let idROles = []
    for (let i in verificarRoles) {
      idROles.push(verificarRoles[i]._id)
    }
    //console.log(idROles);

    let data = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "username": this.username,
      "roles": idROles
    }
    this.servicesMProcesses.AddUsersToProcess(this.idProcess, data).subscribe(
      data => {
        this.toastr.success("Se a registrado ", this.username);
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        setTimeout(function () { window.location.reload(); }, 1000);
      }
    )
  }
  updateUserProcess() {
    let verificarRoles = this.clone(this.userRolesUpdate)
    verificarRoles = verificarRoles.filter(item => {
      return item.status === true;
    })
    let idROles = []
    for (let i in verificarRoles) {
      idROles.push(verificarRoles[i]._id)
    }
    let data = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "username": this.username,
      "roles": idROles
    }
    this.servicesMProcesses.UpdateUserToProcess(this.idProcess, this.idUserRol, data).subscribe(
      data => {
        this.toastr.success("Se a actualizado", this.username);
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        this.usuarios = data;
        this.actualizarUsuario = false
      }
    )

  }
  getRoles() {
    this.servicesMProcesses.GetRolesProcess(this.idProcess).subscribe(
      response => {
        this.roles = response;
        this.userRoles = this.clone(this.roles)
        for (let i in this.userRoles) {
          this.userRoles[i].status = false;
        }
        //console.log("this.roles: ", this.roles);
      }
    );
  }
  getFlow() {
    this.servicesMProcesses.GetStepsFlow(this.idProcess).subscribe(
      data => {
        this.flowSteps = data;
        //console.log(this.flowSteps.nodes);
      }
    )
  }
  firstOrigin(idStep: string, name: string) {
    this.idStepSelect = this.stepsProcess.find((item) => {
      return item.typeStep._id == idStep;
    });
    if (this.idStepSelect) {
      this.idStepSelect.isFirst = !this.idStepSelect.isFirst;
      for (let i in this.steps) {
        //console.log(this.steps[i])
        if (this.steps[i].step._id == idStep) {
          this.steps[i].isFirst = this.idStepSelect.isFirst;
        }
      }
      this.serviceMSteps.SetOriginStep(this.idStepSelect._id).subscribe(
        data => {
          //console.log("data: ", data);
          this.toastr.success(name, "Haz cambiando el step de origen a:")
          setTimeout(function () { window.location.reload(); }, 1000);
        });
    } else {
      this.toastr.show("Por favor primero agrega el step")
    }
    //console.log("idStepSelect: ", this.idStepSelect);

  }

  addEntityToProcess(entity: any, status: boolean) {
    if (status === false) {
      let data = {
        'entity': entity._id
      }
      this.servicesMProcesses.addEntityToProcess(this.idProcess, data).subscribe(
        data => {
          this.toastr.success("Se a agregado la entidad")
        }
      )
    } else if (status === true) {
      this.servicesMProcesses.removeEntityToProcess(this.idProcess, entity._id).subscribe(
        data => {
          this.toastr.info("Se a eliminado la entidad")
        }
      )
    }
  }
}
