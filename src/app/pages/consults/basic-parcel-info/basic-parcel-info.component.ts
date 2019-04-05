import { Component, Inject, OnInit } from '@angular/core';
import { BasicConsultService } from 'src/app/services/consult/basic-consult.service';
import { BasicConsult } from 'src/app/models/basic-parcel-info.interface';

declare var xepOnline: any;

@Component({
  templateUrl: 'basic-parcel-info.component.html'
})
export class BasicParcelInfoComponent implements OnInit {

  showResult: boolean = false;
  inputNupre: string;
  inputFMI: string;
  inputCadastralCode: string;
  basicConsult: BasicConsult;
  constructor(private service: BasicConsultService) { }

  ngOnInit() {
  }

  search() {
    console.log(this.showResult)
    if (this.inputNupre || this.inputCadastralCode || this.inputFMI) {
      this.showResult = true;
      this.getBasicInfo();
    } else {
      this.showResult = false;
    }
  }
  getBasicInfo() {
    this.service.getBasicConsultNumPredial<BasicConsult>(this.inputNupre).subscribe(data => {
      this.basicConsult = data;
      console.log(data);
    });
  }
  downloadPDF(){
    return xepOnline.Formatter.Format('contentPDF',{render:'download'});
  }
}
