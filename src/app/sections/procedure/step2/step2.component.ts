import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  public entity: string;

  public urlButton: string;

  public optionsEntities: Array<any>;

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.entity = '';

    this.urlButton = '';

    this.optionsEntities = [];
  }

  ngOnInit() {
    this.getEntities();
  }

  public getEntities() {
    const entity1 = {
      id: 1,
      name: 'Ministerio de Vivienda, Ciudad y Territorio',
      url: 'http://www.minvivienda.gov.co/'
    };
    const entity2 = {
      id: 2,
      name: 'Ministerio de Ambiente y Desarrollo Sostenible',
      url: 'http://www.minambiente.gov.co/'
    };
    const entity3 = {
      id: 3,
      name: 'CAR / Autoridad Ambiental',
      url: 'https://asocars.org/corporaciones/'
    };
    const entity4 = {
      id: 4,
      name: 'Departamento',
      url: 'https://www.fnd.org.co/'
    };
    const entity5 = {
      id: 5,
      name: 'CROT-CTP-CCP ',
      url: 'http://www.sdp.gov.co/noticias/participacion-pot'
    };
    this.optionsEntities.push(entity1);
    this.optionsEntities.push(entity2);
    this.optionsEntities.push(entity3);
    this.optionsEntities.push(entity4);
    this.optionsEntities.push(entity5);
  }

  public onEntity(event) {
    const entityId: number = parseInt(event.target.value);
    console.log(entityId);

    const entity = this.optionsEntities.find(item => {
      return item.id === entityId;
    });
    console.log('entity', entity);
    this.urlButton = entity.url;
  }

  public nextStep() {
    this.toastr.success('Se ha guaradado la información con éxito', 'Información Guardada');
    this.router.navigate(['/tramites/pot/paso3']);
  }

}
