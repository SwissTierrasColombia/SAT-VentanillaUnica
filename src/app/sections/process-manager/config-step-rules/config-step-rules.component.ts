import { Component, OnInit } from '@angular/core';
import { MProcessesService } from 'src/app/services/process-manager/m-processes.service';
import { MStepsService } from 'src/app/services/process-manager/m-steps.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TypeDataFieldModel } from 'src/app/models/typeDataField.model';
import { CallbacksModel } from 'src/app/models/callbacks.model';
import { PDomainsService } from 'src/app/services/process-manager/p-domains.service';

@Component({
  selector: 'app-config-step-rules',
  templateUrl: './config-step-rules.component.html',
  styleUrls: ['./config-step-rules.component.scss']
})
export class ConfigStepRulesComponent implements OnInit {

  formRulesStepProcess: any;
  idStep: string;
  nameStep: string;
  idProcess: string;
  idStepSelect: any;
  allFieldStep: any;
  TypeData: any;
  allstepsSelect: any;
  allCallback: any;
  steps = [];
  changeStepAux: any;
  operatorEmpty: string;

  constructor(
    private servicesMProcesses: MProcessesService,
    private serviceMSteps: MStepsService,
    private servicesPDomains: PDomainsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public callbacks: CallbacksModel,
    public typeDataFieldModel: TypeDataFieldModel
  ) {
    this.operatorEmpty = '5d7bd1056887f0354a82e1b1';
  }

  ngOnInit() {
    this.route.params.subscribe(
      (response: any) => {
        this.idStep = response.idStep;
        this.nameStep = response.nameStep;
        this.idProcess = response.idProceso;
        //console.log("route response", response);
      }
    );
    this.servicesPDomains.GetTypeDataStepsProcess().subscribe(
      data => {
        this.TypeData = data;
        //console.log(this.TypeData);

      }
    );
    this.servicesPDomains.GetTypesCallbacks().subscribe(
      response => {
        this.allCallback = response
        //console.log(this.allCallback);
      }
    )
    let promiseForm = new Promise((resolve, reject) => {
      this.servicesMProcesses.GetStepsProcess(this.idProcess).subscribe(
        response => {
          this.allstepsSelect = response;
          //console.log("this.allstepsSelect: ", this.allstepsSelect);
          this.idStepSelect = this.allstepsSelect.find((item) => {
            return item.typeStep._id == this.idStep;
          })

          if (this.idStepSelect) {
            this.serviceMSteps.GetFieldsFromStep(this.idStepSelect._id).subscribe(
              response => {
                this.allFieldStep = response;
                //console.log("this.idStepSelect: ", this.idStepSelect._id);
                resolve()
              }
            )
          }
        }
      )
    });
    Promise.all([promiseForm]).then(values => {
      if (this.idStepSelect.rules.length > 0) {
        //console.log("this.idStepSelect.rules: ", this.idStepSelect.rules);

        this.formRulesStepProcess = this.idStepSelect.rules;
        //console.log(this.formRulesStepProcess);
        this.formRulesStepProcess.forEach(element => {
          element.conditions.forEach(element => {
            if (this.typeDataFieldModel.typeDataSingleResponseList === element.typeData) {
              element.value = parseInt(element.value)
            }
            if (this.typeDataFieldModel.typeDataMultipleResponseList === element.typeData) {
              let values = element.value.split(",");
              values = values.map(element => {
                return parseInt(element);
              });
              element.value = values
            }
          });

        });
      } else {
        this.formRulesStepProcess = [
          {
            "conditions": [
              {
                "metadata": {
                  "options": []
                },
                "operators": []
              }
            ],
            "callbacks": [
              {
                'metadata': {}
              }
            ],
          }
        ]
      }
      //console.log("this.formRulesStepProcess: ", this.formRulesStepProcess);


    });
  }
  clone(obj: Object) {
    return JSON.parse(JSON.stringify(obj))
  }
  volver() {
    this.router.navigate(['gestor-procesos/procesos/' + this.idProcess + '/configuracion/']);
  }
  addNewRule() {
    this.formRulesStepProcess.push({
      "conditions": [
        {
          "metadata": {
            "options": []
          },
          "operators": []
        }
      ],
      "callbacks": [
        {
          'metadata': {}
        }
      ],
    });
  }
  addNewConditions(idOut: number) {
    this.formRulesStepProcess[idOut].conditions.push({
      "metadata": {
        "options": []
      }
    });
  }
  addNewCallback(idOut: number) {
    this.formRulesStepProcess[idOut].callbacks.push({ 'metadata': {} });
  }
  deleteRule(idOut: number) {
    let idRule = this.formRulesStepProcess[idOut]._id
    this.serviceMSteps.RemoveRuleToStep(this.idStepSelect._id, idRule).subscribe(
      response => {
        this.toastr.success("Se a eliminado correctamente la regla")
        this.formRulesStepProcess.splice(idOut, 1);
        setTimeout(function () { window.location.reload(); }, 1000);
      }
    )
    //this.formRulesStepProcess.splice(idOut, 1);
  }
  deleteConditions(idOut: number, idin: number) {
    this.formRulesStepProcess[idOut].conditions.splice(idin, 1);
  }
  deleteCallback(idOut: number, idin: number) {
    this.formRulesStepProcess[idOut].callbacks.splice(idin, 1);
  }
  modelChanged(idfiel: string, idOut: number, idInt: number) {
    this.formRulesStepProcess[idOut].conditions[idInt].operators = [];
    this.formRulesStepProcess[idOut].conditions[idInt].metadata.options = [];
    let aux = this.allFieldStep.find((item) => {
      return item._id == idfiel;
    })
    if (aux.metadata) {
      aux.metadata.options.forEach(element => {
        this.formRulesStepProcess[idOut].conditions[idInt].metadata.options.push(element);
      });
    }
    //console.log(this.formRulesStepProcess[idOut].conditions[idInt]);

    //console.log(element);


    if (aux.typeData._id === this.typeDataFieldModel.typeDataCheckbox) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataCheckbox
    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataDate) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataDate

    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataEmail) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataEmail
    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataFile) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataFile
    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataMultipleResponseList) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataMultipleResponseList
    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataNumber) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataNumber
    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataPhoneNumber) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataPhoneNumber
    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataSingleResponseList) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataSingleResponseList
    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataSingleResponseList) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataSingleResponseList
    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataText) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataText
    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataTextarea) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataTextarea
    }
    if (aux.typeData._id === this.typeDataFieldModel.typeDataUrl) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typeDataFieldModel.typeDataUrl
    }
    if (this.formRulesStepProcess[idOut].conditions[idInt].typeData) {
      let auxTypeData = this.TypeData.find(item => {
        return item._id === this.formRulesStepProcess[idOut].conditions[idInt].typeData
      });
      this.formRulesStepProcess[idOut].conditions[idInt].operators = auxTypeData.operators
    }

  }
  CreateRule() {
    let data = this.clone(this.formRulesStepProcess)



    for (let i in data) {
      for (let j in data[i].conditions) {
        if (data[i].conditions[j].hasOwnProperty('metadata')) {
          if (typeof (data[i].conditions[j].value) == 'object') {
            data[i].conditions[j].value = data[i].conditions[j].value.join()
            //console.log(data[i].conditions[j].value);

          } else if (typeof (data[i].conditions[j].value) == 'number') {
            data[i].conditions[j].value = JSON.stringify(data[i].conditions[j].value)
            //console.log(data[i].conditions[j].value);
          }

        }
      }
    }
    let promiseForm = new Promise((resolve, reject) => {
      for (let i in data) {
        if (data[i]._id) {
          this.serviceMSteps.UpdateRuleToStep(this.idStepSelect._id, data[i]._id, data[i]).subscribe(
            response => {
              this.toastr.success("Se han actualizado las reglas")
              resolve()
            }
          )
        } else {
          this.serviceMSteps.AddRuleToStep(this.idStepSelect._id, data[i]).subscribe(
            response => {
              this.toastr.success("Se han registrado las reglas")
              resolve()
            }
          );
        }
      }
    });
    Promise.all([promiseForm]).then(values => {
      window.location.reload();
    });

  }
  modelChangedOperator(item: any, idOut: number, idInt: number) {
    this.formRulesStepProcess[idOut].conditions[idInt].value = ''
    if (this.operatorEmpty === item.operator) {
      this.formRulesStepProcess[idOut].conditions[idInt].value = 'empty'
    }
  }
}
