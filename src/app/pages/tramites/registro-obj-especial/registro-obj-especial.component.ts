import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ObjectEspecialRegimeService } from 'src/app/services/object-especial-regime/object-especial-regime.service';
import { RestrictionsObjectEspecial } from 'src/app/models/restrictions-object-especial';
import { ModelsEspecialRegime } from 'src/app/models/models-especial-regime.interface';
import { FeaturesObjectEspecial } from 'src/app/models/features-object-especial.interface';
import { TokenJwt } from 'src/app/models/token-jwt.interface';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { ObjSpecialRegime } from '../../../models/object-especial-regime.interface';

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
  updateObject: any;
  actualizar = false;
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
        } else if (dataCategorias[i].restrictions[j].status == true) {
          delete dataCategorias[i].restrictions[j].status;
        }
        const result = dataCategorias[i].restrictions.filter(word => word != null);
        console.log("result: ", j, " : ", result);
        if (j == '3') {
          dataCategorias[i].restrictions = result
        }
      }
    }
    this.services.PostObjectRegister(name, model, object, wsurl, fechaInicio, fechaFin, dataCategorias);
    delete this.ObjetoSeleccionado[0].name;
    this.restricciones = [];
    this.services.getObjetoRegister(this.id).subscribe(
      response => {
        this.objetosRegistrados = response;
        window.location.reload()
      },
      error => {
        console.log(error);
      }
    )
    this.agregar = false
  }
  updateTopic(id: number) {
    this.actualizar = true
    this.updateObject = this.objetosRegistrados[id]

  }
  deleteTopic(id: number) {
    //console.log(this.objetosRegistrados[id].objSpecialRegime.id);
    this.services.deleteObject(this.objetosRegistrados[id].objSpecialRegime.id)
  }

}