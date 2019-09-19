import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TypeDataFieldModel } from 'src/app/models/typeDataField.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MProcessesService } from 'src/app/services/process-manager/m-processes.service';
import { PDomainsService } from 'src/app/services/process-manager/p-domains.service';
import { MStepsService } from 'src/app/services/process-manager/m-steps.service';

@Component({
  selector: 'app-config-steps',
  templateUrl: './config-steps.component.html',
  styleUrls: ['./config-steps.component.scss']
})
export class ConfigStepsComponent implements OnInit {

  idProcess: any;
  idStep: any;
  idStepSelect: any;
  nameStep: string;
  roles: any;
  formStepProcess = [];
  permissions = [];
  typedata: any;
  allstepsSelect: any;
  options = []
  optionsMultiple = []
  optionsCasilla = []
  option: string;
  optionMulti: string;
  constructor(
    private servicesMProcesses: MProcessesService,
    private serviceMSteps: MStepsService,
    private servicesPDomains: PDomainsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public typeDataFieldModel: TypeDataFieldModel
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
    this.servicesPDomains.GetTypeDataStepsProcess().subscribe(
      response => {
        //console.log("response", response);
        this.typedata = response;
      }
    )
    let promiseForm = new Promise((resolve) => {
      this.servicesMProcesses.GetStepsProcess(this.idProcess).subscribe(
        response => {
          this.allstepsSelect = response;
          this.idStepSelect = this.allstepsSelect.find((item) => {
            return item.typeStep._id == this.idStep;
          })
          if (this.idStepSelect) {
            this.serviceMSteps.GetFieldsFromStep(this.idStepSelect._id).subscribe(
              response => {
                let aux = response.filter(item => {
                  return item.isPrivate === false;
                })
                //console.log(aux);

                this.formStepProcess = aux;
                for (let i in this.formStepProcess) {
                  //this.formStepProcess[i].metadata.options = []
                  this.formStepProcess[i].type = this.formStepProcess[i].typeData._id;
                }
                resolve()
              }
            )
          }
          //console.log("this.idStepSelect: ", this.idStepSelect);

        }
      )
    });

    Promise.all([promiseForm]).then(values => {
      this.servicesMProcesses.GetRolesProcess(this.idProcess).subscribe(
        response => {
          //console.log("response", response);
          this.roles = response;
          for (let i in this.roles) {
            //console.log(this.roles[i]);
            this.permissions.push({
              "role": this.roles[i]._id,
              "nameRole": this.roles[i].role,
              "create": false,
              "read": false,
              "update": false,

            })
          }
          for (let i in this.formStepProcess) {
            //this.formStepProcess[i].metadata.options = []
            for (let y in this.formStepProcess[i].permissions) {
              this.formStepProcess[i].permissions[y].nameRole = this.roles[y].role
            }
          }
        }
      );
    });
  }
  clone(obj: Object) {
    return JSON.parse(JSON.stringify(obj))
  }

  createFieldStepProcess() {
    this.formStepProcess.push({
      "metadata": {
        "options": []
      },
      "permissions": this.clone(this.permissions)
    })
  }
  deleteFieldStepProcess(id: number) {

    //console.log(this.formStepProcess[id]);
    this.serviceMSteps.RemoveFieldFromStep(this.idStepSelect._id, this.formStepProcess[id]._id).subscribe(
      response => {
        this.toastr.success("Haz eliminado un campo")
        this.formStepProcess.splice(id, 1)
      }
    )
  }
  changeState(id: number, idtable: number, name: string) {
    this.formStepProcess[id].permissions[idtable][name] = !this.formStepProcess[id].permissions[idtable][name];
  }
  registerFieldStep() {

    let dataForm = this.clone(this.formStepProcess)
    let promise = [];
    for (let i in dataForm) {
      if (!dataForm[i].hasOwnProperty('_id')) {
        let AddFieldToStepPromise = new Promise((resolve, reject) => {
          this.serviceMSteps.AddFieldToStep(this.idStepSelect._id, dataForm[i]).subscribe(
            response => {
              resolve()
            }
          )
        });
        promise.push(AddFieldToStepPromise)
      } else {
        let UpdateFieldToStepPromise = new Promise((resolve, reject) => {
          this.serviceMSteps.UpdateFieldFromStep(this.idStepSelect._id, dataForm[i]._id, dataForm[i]).subscribe(
            response => {
              //console.log("Good Update: ", response);
              resolve()
            }
          )
        });
        promise.push(UpdateFieldToStepPromise)
      }
    }
    Promise.all(promise).then(values => {
      if (values.length > 0) {
        this.toastr.success("Información guardada.");
        setTimeout(function () { window.location.reload(); }, 1000);
      } else {
        this.toastr.info("No se ha agregado ningún campo.");
      }
    });

  }
  AddList(count: number) {
    this.options = this.formStepProcess[count].metadata.options;
    this.options.push(this.option);
    this.formStepProcess[count].metadata.options = this.options;
  }
  AddListMultiple(count: number) {
    this.optionsMultiple = this.formStepProcess[count].metadata.options;
    this.optionsMultiple.push(this.optionMulti);
    this.formStepProcess[count].metadata.options = this.optionsMultiple;
  }
  deleteList(count: number) {
    this.options = this.formStepProcess[count].metadata.options;
    let aux = [];
    for (let i of this.options) {
      aux = this.options.filter(item => {
        return item != i;
      })
    }
    this.options = aux;
    this.formStepProcess[count].metadata.options = aux
  }
  deleteListMultiple(count: number) {
    this.optionsMultiple = this.formStepProcess[count].metadata.options;
    let aux = [];
    for (let i of this.options) {
      aux = this.options.filter(item => {
        return item != i;
      })
    }
    this.options = aux;
    this.formStepProcess[count].metadata.options = aux
  }
  volver() {
    this.router.navigate(['gestor-procesos/procesos/' + this.idProcess + '/configuracion/']);
  }

}
