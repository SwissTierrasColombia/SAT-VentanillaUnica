import { Component, OnInit } from '@angular/core';
import { ParcelConsultService } from 'src/app/services/parcel-consult.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basic-parcel-info',
  templateUrl: './basic-parcel-info.component.html',
  styleUrls: ['./basic-parcel-info.component.css']
})
export class BasicParcelInfoComponent implements OnInit {

  basicParcelInfo:Observable<any>;

  constructor(private parcelConsultService:ParcelConsultService) { }

  ngOnInit() {
    this.getParcelInfo();
  }

  getParcelInfo(){
    this.basicParcelInfo = this.parcelConsultService.getParcelBasicInfo();
  }



}
