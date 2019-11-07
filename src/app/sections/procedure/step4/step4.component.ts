import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {

  public dateLimitRadioOption1: any;
  public dateLimitRadioOption2: any;
  public dateLimitOption3: any;
  public dateLimitOption4: any;
  public dateLimitOption5: any;

  public fileRadioOption1: File;
  public fileRadioOption2: File;
  public fileOption3: File;
  public fileOption4: File;
  public fileOption5: File;


  public showRadio1: boolean;
  public showRadio2: boolean;

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.dateLimitRadioOption1 = null;
    this.dateLimitRadioOption2 = null;
    this.dateLimitOption3 = null;
    this.dateLimitOption4 = null;
    this.dateLimitOption5 = null;

    this.fileRadioOption1 = null;
    this.fileRadioOption2 = null;
    this.fileOption3 = null;
    this.fileOption4 = null;
    this.fileOption5 = null;

    this.showRadio1 = true;
    this.showRadio2 = false;
  }

  ngOnInit() {
  }

  public onFileRadioOption(event, option) {
    switch (option) {
      case 'option1':
        this.fileRadioOption1 = event.target.files[0];
        break;
      case 'option2':
        this.fileRadioOption2 = event.target.files[0];
        break;
      case 'option3':
        this.fileOption3 = event.target.files[0];
        break;
      case 'option4':
        this.fileOption4 = event.target.files[0];
        break;
      case 'option5':
        this.fileOption5 = event.target.files[0];
        break;
    }
  }

  public onChangeRadio(event, option) {
    const target = event.target;
    if (target.checked) {
      switch (option) {
        case 'option1':
          this.showRadio1 = true;
          this.showRadio2 = false;
          break;
        case 'option2':
          this.showRadio1 = false;
          this.showRadio2 = true;
          break;
      }
    }
  }

  public validateDisabled() {

    const validRadios = ((this.dateLimitRadioOption1 && this.fileRadioOption1) || (this.dateLimitRadioOption2 && this.fileRadioOption2));
    const validOption4 = (this.dateLimitOption4 && this.fileOption4);
    const validOption5 = (this.dateLimitOption5 && this.fileOption5);

    return !validRadios || !validOption4 || !validOption5;
  }

  public nextStep() {
    this.toastr.success('Se ha guaradado la información con éxito', 'Información Guardada');
    this.router.navigate(['/tramites/pot/paso5']);
  }

}
