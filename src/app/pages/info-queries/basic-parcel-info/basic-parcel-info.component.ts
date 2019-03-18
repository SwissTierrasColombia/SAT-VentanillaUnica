import { Component, OnInit } from '@angular/core';
import { ParcelConsultService } from 'src/app/services/parcel-consult.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basic-parcel-info',
  templateUrl: './basic-parcel-info.component.html',
  styleUrls: ['./basic-parcel-info.component.css']
})
export class BasicParcelInfoComponent implements OnInit {

  showResult:boolean = false;
  basicParcelInfo:Observable<any>;
  inputNupre:string;
  inputFMI:string;
  inputCadastralCode:string;

  constructor(private parcelConsultService:ParcelConsultService) { }

  ngOnInit() {
    this.getParcelInfo();
  }

  getParcelInfo(){
    this.basicParcelInfo = this.parcelConsultService.getParcelBasicInfo();
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
