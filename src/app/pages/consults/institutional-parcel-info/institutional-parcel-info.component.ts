import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'institutional-parcel-info.component.html'
})
export class InstitutionalParcelInfoComponent implements OnInit {

  showResult = false;
  inputNupre;
  inputFMI;
  inputCadastralCode;
  tab = 1;
  tipoBusqueda = 1;

  constructor() { }

  ngOnInit() {
  }

  selectTypeSearch(id) {
    this.inputCadastralCode = '';
    this.inputFMI = '';
    this.inputNupre = '';
    this.tipoBusqueda = id;
  }

  search() {
    console.log(this.inputNupre);
    if (this.inputNupre || this.inputFMI || this.inputCadastralCode) {
      this.showResult = true;
    } else {
      this.showResult = false;
    }
  }

}
