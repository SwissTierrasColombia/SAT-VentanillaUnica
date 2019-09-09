import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Models
import { TypeDataFieldModel } from '../../../models/typeDataField.model';

// Services
import { MProcessesService } from '../../../services/process-manager/m-processes.service';
import { RProceduresService } from '../../../services/process-manager/r-procedures.service';
import { RProcessesService } from '../../../services/process-manager/r-processes.service';
import { MStepsService } from '../../../services/process-manager/m-steps.service';

@Component({
  selector: 'app-manage-procedure',
  templateUrl: './manage-procedure.component.html',
  styleUrls: ['./manage-procedure.component.scss']
})
export class ManageProcedureComponent implements OnInit {

  public process: any;
  public rProcessId: string;
  public mProcessId: string;
  public fields: Array<any>;
  public mStepId: string;

  public stepActive: any;
  public stepsBefore: Array<any>;
  public stepsAfter: Array<any>;

  public dataBefore: any;

  public dataForm: any;
  public filesForm: Array<any>;

  public codeProcedure: string;

  public errorGlobal: boolean;

  constructor(
    public typeDataFieldModel: TypeDataFieldModel,
    private toastr: ToastrService,
    private rProcedureService: RProceduresService,
    private rProcessService: RProcessesService,
    private mStepsService: MStepsService,
    private route: ActivatedRoute
  ) {
    this.rProcessId = null;
    this.process = null;
    this.fields = [];
    this.dataForm = {};
    this.filesForm = [];
    this.mStepId = null;
    this.codeProcedure = '';
    this.errorGlobal = false;
    this.stepActive = null;
    this.stepsAfter = [];
    this.stepsBefore = [];
    this.dataBefore = {};
  }

  ngOnInit() {
    const params: any = this.route.params;
    this.rProcessId = params._value.rProcessId.toString();

    this.getDataContinueProcedure(this.rProcessId);
    this.getProcess(this.rProcessId);
  }

  public getDataContinueProcedure(rProcessId: string) {
    this.rProcedureService.getDataContinueProcedure(rProcessId).subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.mStepId = data.body.step;
          this.fields = data.body.fields;
          this.fields.forEach(field => {
            this.dataForm[field.field] = '';
          });
        }
      }, () => {
        this.errorGlobal = true;
      }
    );
  }

  public getProcess(rProcessId: string) {
    this.rProcessService.getProcess(rProcessId).subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.process = data.body;
          this.mProcessId = this.process.process._id.toString();

          this.stepActive = this.process.steps.find(item => {
            return item.active === true;
          });

          this.getDataOrderStep(this.stepActive.step._id);
        }
      }, () => {
        this.errorGlobal = true;
      }
    );
  }

  public getDataOrderStep(mStepId: string) {
    this.mStepsService.getDataOrderStep(mStepId).subscribe(
      (data: any) => {
        const before: Array<any> = data.body.before;
        this.stepsBefore = [];
        before.forEach(element => {
          const findBefore = this.process.steps.find(item => {
            return item.step._id === element._id.toString();
          });
          this.stepsBefore.push({ stepBefore: element, dataBefore: findBefore });
          console.log(this.stepsBefore);
        });
      }
    );
  }

  public onFileChange(event: any, field: string) {
    const fileData: File = event.target.files[0];
    this.filesForm.forEach((element, index) => {
      if (element.field === field) {
        this.filesForm.splice(index, 1);
      }
    });
    this.filesForm.push({ file: fileData, field });
  }

  public saveInformation() {

    const formData = new FormData();
    formData.append('mProcess', this.mProcessId);
    formData.append('step', this.mStepId);
    formData.append('rProcess', this.rProcessId);

    const dataForm = Object.assign({}, this.dataForm);

    this.fields.forEach(field => {
      if (field.typeData.toString() === this.typeDataFieldModel.typeDataDate) {
        const valueDate = dataForm[field.field];
        if (valueDate) {
          const month = (valueDate.month < 10) ? `0${valueDate.month}` : valueDate.month;
          const day = (valueDate.day < 10) ? `0${valueDate.day}` : valueDate.day;
          dataForm[field.field] = `${valueDate.year}-${month}-${day}`;
        }
      }
      if (field.typeData.toString() === this.typeDataFieldModel.typeDataCheckbox) {
        const valueCheckbox = dataForm[field.field];
        if (!valueCheckbox) {
          dataForm[field.field] = false;
        }
      }
    });

    if (this.filesForm.length > 0) {
      this.filesForm.forEach(item => {
        formData.append(item.field, item.file);
      });
    }

    for (const prop in dataForm) {
      if (dataForm.hasOwnProperty(prop)) {
        formData.append('dproperty_' + prop, dataForm[prop]);
      }
    }

    this.rProcessService.saveInformationStep(formData).subscribe(
      (data: any) => {

        if (data.status === 200) {
          this.toastr.success('¡Se ha actualizado la información del trámite con éxito!');
          this.codeProcedure = data.body._id.toString();

          // clear fields
          for (const prop in this.dataForm) {
            if (this.dataForm.hasOwnProperty(prop)) {
              this.dataForm[prop] = '';
            }
          }
          // clear fields files
          this.fields.forEach(field => {
            if (field.typeData.toString() === this.typeDataFieldModel.typeDataFile) {
              const element: HTMLInputElement = document.getElementsByName('r_data_' + field.field)[0] as HTMLInputElement;
              element.value = '';
            }
          });
          this.filesForm = [];

        }

      });

  }

}
