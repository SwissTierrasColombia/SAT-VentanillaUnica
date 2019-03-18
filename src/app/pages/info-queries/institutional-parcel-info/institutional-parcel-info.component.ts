import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institutional-parcel-info',
  templateUrl: './institutional-parcel-info.component.html',
  styleUrls: ['./institutional-parcel-info.component.css']
})
export class InstitutionalParcelInfoComponent implements OnInit {

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
