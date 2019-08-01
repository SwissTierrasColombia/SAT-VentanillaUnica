import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ObjectEspecialRegimeService } from 'src/app/services/object-especial-regime/object-especial-regime.service';
import { RestrictionsObjectEspecial } from 'src/app/models/restrictions-object-especial';
import { ModelsEspecialRegime } from 'src/app/models/models-especial-regime.interface';
import { FeaturesObjectEspecial } from 'src/app/models/features-object-especial.interface';
import { TokenJwt } from 'src/app/models/token-jwt.interface';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-registro-obj-especial',
  templateUrl: './registro-obj-especial.component.html',
  styleUrls: ['./registro-obj-especial.component.scss']
})

export class RegistroObjEspecialComponent implements OnInit {
  objetosRegistrados: any;
  entityModels: ModelsEspecialRegime;
  TopicSeleccionado: any;
  ModeloSeleccionado: any;
  ObjetoSeleccionado: any;
  camposFeature: FeaturesObjectEspecial;
  token: TokenJwt;
  fechaInicio: Date;
  fechaFinal: Date;
  formcategories = []
  categorias: any
  restricciones = [];
  agregar = false;
  id = 0
  constructor(private services: ObjectEspecialRegimeService, private route: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('access_token')) {
      this.route.navigate(['inicio']);
    } else {
      this.token = JSON.parse(atob(sessionStorage.getItem('access_token').split('.')[1]))
      for (let index = 0; index < this.token.realm_access.roles.length; index++) {
        if (this.token.realm_access.roles[index] === 'Entidad1') {
          this.id = 1
        } else if (this.token.realm_access.roles[index] === 'Entidad2') {
          this.id = 2
        } else if (this.token.realm_access.roles[index] === 'Entidad3') {
          this.id = 3
        } else if (this.token.realm_access.roles.length == index + 1) {
          this.route.navigate(['inicio']);
        }

      }
      this.services.getObjetoRegister(this.id).subscribe(
        response => {
          this.objetosRegistrados = response;
          //console.log("this.objetosRegistrados", this.objetosRegistrados, " this.id: ", this.id);
        },
        error => {
          console.log(error);

        }
      )
    }
  }
  registrarobj() {
    this.agregar = true;
    this.services.GetDataModel(this.id).subscribe(
      response => {
        this.entityModels = response;
      },
      error => {
        console.log(error);

      }
    );
  }
  createCategory() {
    this.formcategories.push({
      "category": {
        "id": 0,
      },
      restrictions: JSON.parse(JSON.stringify(this.restricciones))
    })
  }
  deleteCategory(id: number) {
    this.formcategories.splice(id, 1)
  }
  CreateCampos() {
    // Get the size of an object
    this.services.GetFeatures(this.ObjetoSeleccionado[0].url).subscribe(
      response => {
        this.camposFeature = response
      },
      error => {
        console.error(error);

      }
    );
    this.services.GetRestrictions().subscribe(
      response => {
        for (let i in response) {
          this.restricciones.push({
            "id": 0,
            "restriction": response[i],
            "status": false
          })
        }
      },
      error => {
        console.error(error);

      }
    );
  }

  RegistrarObjeto() {
    let name = this.TopicSeleccionado.name;
    let model = this.ModeloSeleccionado.name;
    let object = this.ObjetoSeleccionado[0].name;
    let wsurl = this.ObjetoSeleccionado[0].url;
    let fechaInicio = this.fechaInicio;
    let fechaFin = this.fechaFinal;
    let dataCategorias = JSON.parse(JSON.stringify(this.formcategories))
    for (let i in dataCategorias) {
      for (let j in dataCategorias[i].restrictions) {
        if (dataCategorias[i].restrictions[j].status == false) {
          delete dataCategorias[i].restrictions[j];
          //dataCategorias[i].restrictions.splice(j, 1)
        } else if (dataCategorias[i].restrictions[j].status == true) {
          delete dataCategorias[i].restrictions[j].status;
        }
      }
    }
    //dataCategorias[i].restrictions.splice(j, 1);
    this.services.PostObjectRegister(name, model, object, wsurl, fechaInicio, fechaFin, dataCategorias);
    this.restricciones = [];
    this.services.getObjetoRegister(this.id).subscribe(
      response => {
        this.objetosRegistrados = response;
      },
      error => {
        console.log(error);
      }
    )
    this.agregar = false
  }

}