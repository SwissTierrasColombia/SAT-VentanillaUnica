import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  public checkProduct1: boolean;
  public checkProduct2: boolean;
  public checkProduct3: boolean;
  public checkProduct4: boolean;
  public checkProduct5: boolean;
  public checkProduct6: boolean;

  public modelPOTValid: boolean;

  public fileData1: File;
  public fileData2: File;
  public fileData3: File;
  public fileData4: File;
  public fileData5: File;
  public fileData6: File;

  public fileModelPOT: File;

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.checkProduct1 = false;
    this.checkProduct2 = false;
    this.checkProduct3 = false;
    this.checkProduct4 = false;
    this.checkProduct5 = false;
    this.checkProduct6 = false;

    this.modelPOTValid = null;

    this.fileData1 = null;
    this.fileData2 = null;
    this.fileData3 = null;
    this.fileData4 = null;
    this.fileData5 = null;
    this.fileData6 = null;

    this.fileModelPOT = null;
  }

  ngOnInit() {
  }

  public onFileChange(event, product) {

    switch (product) {
      case 'product1':
        this.checkProduct1 = true;
        this.fileData1 = event.target.files[0];
        break;
      case 'product2':
        this.checkProduct2 = true;
        this.fileData2 = event.target.files[0];
        break;
      case 'product3':
        this.checkProduct3 = true;
        this.fileData3 = event.target.files[0];
        break;
      case 'product4':
        this.checkProduct4 = true;
        this.fileData4 = event.target.files[0];
        break;
      case 'product5':
        this.checkProduct5 = true;
        this.fileData5 = event.target.files[0];
        break;
      case 'product6':
        this.checkProduct6 = true;
        this.fileData6 = event.target.files[0];
        break;
    }

  }

  public onUploadFile(event) {
    this.fileModelPOT = event.target.files[0];
  }

  public validateFile() {
    const random = Math.round((Math.random() * (2 - 0) + 0));
    this.modelPOTValid = (random === 0) ? false : true;
    console.log('hi', random, this.modelPOTValid)
  }

  public nextStep() {
    this.toastr.success('Se ha guaradado la información con éxito', 'Información Guardada');
    this.router.navigate(['/tramites/pot/paso4']);
  }

}
