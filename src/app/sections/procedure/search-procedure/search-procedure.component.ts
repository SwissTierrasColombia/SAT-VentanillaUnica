import { Component, OnInit } from '@angular/core';

// Libraries
import { ToastrService } from 'ngx-toastr';

// Models
import { TypeDataFieldModel } from '../../../models/typeDataField.model';

// Services
import { RProcessesService } from '../../../services/process-manager/r-processes.service';

@Component({
  selector: 'app-search-procedure',
  templateUrl: './search-procedure.component.html',
  styleUrls: ['./search-procedure.component.scss']
})
export class SearchProcedureComponent implements OnInit {

  public process: any;
  public rProcessId: string;
  public steps: Array<{}>;

  public notFoundProcedure: boolean;

  constructor(
    public typeDataFieldModel: TypeDataFieldModel,
    private rProcessService: RProcessesService,
    private toastr: ToastrService,
  ) {
    this.process = null;
    this.rProcessId = '5d80e2bd5dab8a17063bae6f';
    this.notFoundProcedure = false;
    this.steps = [];
  }

  ngOnInit() {

  }

  public searchProcess() {
    if (this.rProcessId) {
      this.rProcessService.getProcess(this.rProcessId).subscribe(
        (data: any) => {
          if (data.status === 200) {
            this.process = data.body;
            this.steps = data.body.steps;
            this.notFoundProcedure = false;
          }
        }, () => {
          this.notFoundProcedure = true;
          this.process = null;
        }
      );
    } else {
      this.toastr.error('Debe ingresar un código de trámite', 'Error Buscando Trámite ...');
    }
  }

  public isValidOptionTypeDataMultipleResponseList(value, index) {

    const responses = value.split(',');
    for (const i in responses) {
      if (responses.hasOwnProperty(i)) {
        const response = responses[i];
        if (index === parseInt(response)) {
          return true;
        }
      }
    }
    return false;
  }

  public downloadFile(mStepId: string, fieldName: string) {
    this.rProcessService.downloadFile(this.rProcessId, mStepId, fieldName).subscribe(
      (data) => {
        const contentType = data.headers.get('content-type');
        const type = contentType.split(',')[0];
        const ext = contentType.split(',')[1];
        const dataFile = data.body;
        const blob = new Blob([dataFile], { type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, 'archivo' + ext);
        window.open(url);
      }
    );
  }

}
