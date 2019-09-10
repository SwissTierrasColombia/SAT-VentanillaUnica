import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component implements OnInit {

  public dateRadioOption1: any;
  public dateRadioOption2: any;
  public dateRadioOption3: any;
  public dateOption4: any;
  public dateOption5: any;
  public dateOption6: any;

  public checkNotification: boolean;

  public showRadio1: boolean;
  public showRadio2: boolean;
  public showRadio3: boolean;

  public fileRadio1: File;
  public fileRadio2: File;
  public fileRadio3: File;

  public urlOption4: string;
  public urlOption5: string;

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {

    this.dateRadioOption1 = null;
    this.dateRadioOption2 = null;
    this.dateRadioOption3 = null;
    this.dateOption4 = null;
    this.dateOption5 = null;
    this.dateOption6 = null;

    this.urlOption4 = '';
    this.urlOption5 = '';

    this.checkNotification = false;

    this.showRadio1 = true;
    this.showRadio2 = false;
    this.showRadio3 = false;

    this.fileRadio1 = null;
    this.fileRadio2 = null;
    this.fileRadio3 = null;

  }

  ngOnInit() {
  }

  public onChangeRadio(event, option) {
    const target = event.target;
    if (target.checked) {
      switch (option) {
        case 'option1':
          this.showRadio1 = true;
          this.showRadio2 = false;
          this.showRadio3 = false;
          break;
        case 'option2':
          this.showRadio1 = false;
          this.showRadio2 = true;
          this.showRadio3 = false;
          break;
        case 'option3':
          this.showRadio1 = false;
          this.showRadio2 = false;
          this.showRadio3 = true;
          break;
      }
    }
  }

  public onFileRadioOption(event, option) {
    switch (option) {
      case 'option1':
        this.fileRadio1 = event.target.files[0];
        break;
      case 'option2':
        this.fileRadio2 = event.target.files[0];
        break;
      case 'option3':
        this.fileRadio3 = event.target.files[0];
        break;
    }
  }

  public validateDisabled() {


  }

  public finish() {
    this.toastr.success('Se ha finalizado el trámite', 'Información Guardada');
  }

}
