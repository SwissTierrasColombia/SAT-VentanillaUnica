import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  // data
  public department: string;
  public municipality: string;
  public population: number;
  public typePOT: string;
  public type: string;
  public dateStart: any;
  public municipalFileURL: any;
  public observations: string;
  public responsable: string;
  public fileData: File;

  // metadata
  public optionsDepartments: Array<any>;
  public optionsMunicipalities: Array<any>;
  public optionsTypePOT: Array<any>;
  public optionsType: Array<any>;

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.department = '';
    this.municipality = '';
    this.population = 0;
    this.typePOT = '';
    this.type = '';
    this.dateStart = {};
    this.municipalFileURL = 'https://alcadiamunicipio/pot/expedienteMunicipal.org';
    this.observations = '';
    this.responsable = '';
    this.fileData = null;

    this.optionsDepartments = [];
    this.optionsMunicipalities = [];
    this.optionsTypePOT = [];
    this.optionsType = [];
  }

  ngOnInit() {
    this.getDepartments();
    this.getTypesPOT();
    this.getTypes();
  }

  public getDepartments() {
    const deparmentSucre = {
      id: 1,
      name: 'SUCRE',
      municipalities: [
        {
          id: 1,
          name: 'OVEJAS'
        },
        {
          id: 2,
          name: 'COVEÑAS'
        },
        {
          id: 3,
          name: 'EL ROBLE'
        },
        {
          id: 4,
          name: 'SINCELEJO'
        },
        {
          id: 5,
          name: 'TOLUVIEJO'
        },
      ]
    };
    this.optionsDepartments.push(deparmentSucre);
  }

  public getMunicipalities(event: any) {
    const departmentId: number = parseInt(event.target.value);
    const deparmentFound = this.optionsDepartments.find(item => {
      return item.id === departmentId;
    });
    this.optionsMunicipalities = deparmentFound.municipalities;
  }

  public getPopulation() {
    const random = (Math.random() * (47000 - 5000) + 5000);
    this.population = Number.parseInt(random.toFixed(0));
  }

  public getTypesPOT() {
    const typePOT = {
      id: 1,
      name: 'POT'
    };
    const typePBOT = {
      id: 2,
      name: 'PBOT'
    };
    const typeEOT = {
      id: 3,
      name: 'EOT'
    };

    this.optionsTypePOT.push(typePOT);
    this.optionsTypePOT.push(typePBOT);
    this.optionsTypePOT.push(typeEOT);
  }

  public getTypes() {
    const typeFormulation = {
      id: 1,
      name: 'Formulación'
    };
    const typeReview = {
      id: 2,
      name: 'Revisión'
    };

    this.optionsType.push(typeFormulation);
    this.optionsType.push(typeReview);
  }

  public onFileChange(event: any) {
    this.fileData = event.target.files[0];
  }

  public nextStep() {

    const department = this.department;
    const municipality = this.municipality;
    const typePOT = this.typePOT;
    const type = this.type;
    const dateStart = this.dateStart;
    const observations = this.observations;
    const responsable = this.responsable;
    const fileData = this.fileData;

    const validateRequired = department && municipality && typePOT && type && dateStart && observations && responsable && fileData;
    if (validateRequired) {
      this.toastr.success('Se ha guaradado la información con éxito', 'Información Guardada');
      this.router.navigate(['/tramites/pot/paso2']);
    } else {
      this.toastr.error('Los campos marcados con * son obligatorios', 'Error en la Validación');
    }

  }

}
