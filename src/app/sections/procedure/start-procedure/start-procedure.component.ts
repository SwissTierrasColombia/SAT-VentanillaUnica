import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Models
import { TypeDataFieldModel } from '../../../models/typeDataField.model';

// Services
import { MProcessesService } from '../../../services/process-manager/m-processes.service';
import { RProceduresService } from '../../../services/process-manager/r-procedures.service';
import { RProcessesService } from '../../../services/process-manager/r-processes.service';

@Component({
  selector: 'app-start-procedure',
  templateUrl: './start-procedure.component.html',
  styleUrls: ['./start-procedure.component.scss']
})
export class StartProcedureComponent implements OnInit {

  public process: any;
  public mProcessId: string;
  public fields: Array<any>;
  public mStepId: string;

  public dataForm: any;
  public filesForm: Array<any>;

  public codeProcedure: string;

  public errorGlobal: boolean;

  constructor(
    public typeDataFieldModel: TypeDataFieldModel,
    private toastr: ToastrService,
    private rProcedureService: RProceduresService,
    private rProcessService: RProcessesService,
    private mProcessService: MProcessesService,
    private route: ActivatedRoute
  ) {
    this.mProcessId = null;
    this.process = null;
    this.fields = [];
    this.dataForm = {};
    this.filesForm = [];
    this.mStepId = null;
    this.codeProcedure = '';
    this.errorGlobal = false;
  }

  ngOnInit() {
    const params: any = this.route.params;
    this.mProcessId = params._value.mProcessId.toString();

    this.getDataStartProcedure(this.mProcessId);
    this.getProcess();
  }

  public getDataStartProcedure(mProcessId: string) {
    this.rProcedureService.getDataStartProcedure(mProcessId).subscribe(
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

  public getProcess() {
    this.mProcessService.getProcessesAvailable().subscribe(
      (data: any) => {
        if (data.status === 200) {
          const processes = data.body;
          this.process = processes.find(process => {
            return process._id.toString() === this.mProcessId;
          });
        }
      }, () => {
        this.errorGlobal = true;
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
          this.toastr.success('¡Se ha creado el trámite con éxito!');
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
