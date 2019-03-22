import { Component } from '@angular/core';

@Component({
  templateUrl: 'institutional-parcel-info.component.html'
})
export class InstitutionalParcelInfoComponent {

  showResult:boolean = false;
  inputNupre:string;
  inputFMI:string;
  inputCadastralCode:string;

  constructor() { }

  ngOnInit() {
  }

  search(){
    console.log(this.inputNupre);
    if(this.inputNupre || this.inputFMI || this.inputCadastralCode){
      this.showResult = true;
    }else{
      this.showResult = false;
    }
  }

}
