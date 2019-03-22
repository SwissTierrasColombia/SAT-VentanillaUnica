import { Component, Inject, OnInit } from '@angular/core';
import { ParcelConsultService } from 'src/app/services/parcel-consult.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'basic-parcel-info.component.html'
})
export class BasicParcelInfoComponent implements OnInit {

  showResult: boolean = false;
  inputNupre: string;
  inputFMI: string;
  inputCadastralCode: string;

  constructor() { }

  ngOnInit() {
  }

  search() {
    console.log(this.showResult)
    if (this.inputNupre || this.inputCadastralCode || this.inputFMI) {
      this.showResult = true;
    } else {
      this.showResult = false;
    }
  }
}
