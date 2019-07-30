import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ObjectEspecialRegimeService } from 'src/app/services/object-especial-regime/object-especial-regime.service';
import { RestrictionsObjectEspecial } from 'src/app/models/restrictions-object-especial';
import { ModelsEspecialRegime } from 'src/app/models/models-especial-regime.interface';
import { FeaturesObjectEspecial } from 'src/app/models/features-object-especial.interface';
import { TokenJwt } from 'src/app/models/token-jwt.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-obj-especial',
  templateUrl: './registro-obj-especial.component.html',
  styleUrls: ['./registro-obj-especial.component.scss']
})

export class RegistroObjEspecialComponent implements OnInit {

  entityModels: ModelsEspecialRegime;
  TopicSeleccionado: any;
  ModeloSeleccionado: any;
  ObjetoSeleccionado: any;
  camposFeature: FeaturesObjectEspecial;
  token: TokenJwt;
  fechaInicio: Date;
  fechaFinal: Date;
  categories = []
  campo: [];
  valorCampo: [];
  urlInfo: [];
  description: [];
  restricciones: RestrictionsObjectEspecial;
  count = 0;
  constructor(private services: ObjectEspecialRegimeService, private route: Router) {
  }

  ngOnInit() {
    if (!sessionStorage.getItem('access_token')) {
      this.route.navigate(['inicio']);
    } else {
      this.token = JSON.parse(atob(sessionStorage.getItem('access_token').split('.')[1]))
      let id = 0
      for (let index = 0; index < this.token.realm_access.roles.length; index++) {
        if (this.token.realm_access.roles[index] === 'Entidad1') {
          id = 1
        } else if (this.token.realm_access.roles[index] === 'Entidad2') {
          id = 2
        } else if (this.token.realm_access.roles[index] === 'Entidad3') {
          id = 3
        } else if (this.token.realm_access.roles.length == index + 1) {
          this.route.navigate(['inicio']);
        }

      }

      this.services.GetDataModel(id).subscribe(
        response => {
          this.entityModels = response;
        },
        error => {
          console.log(error);

        }
      );


    }
  }
  createObjectCategory(id: number) {
    //Categorias
    let field = this.campo;
    let value = this.valorCampo
    let urlMasInfo = this.urlInfo
    let description = this.description
    let restriction = [
    ]
    for (let i in this.restricciones) {
      if (this.restricciones[i].status == true) {
        delete this.restricciones[i].status;
        restriction.push({
          id: id,
          "restriction": this.restricciones[i]
        });
      }
    }

    this.categories[id] = ({
      "category": {
        "id": id,
        "field": field,
        "value": value,
        "urlMasInfo": urlMasInfo,
        "description": description
      },
      restriction
    })
  }
  createCategory() {
    var node = document.createElement("DIV");
    var itm = document.getElementById("child").lastChild;
    var cln = itm.cloneNode(true);
    node.appendChild(cln);
    document.getElementById("Nodo").appendChild(node);
    this.createObjectCategory(this.count)
    this.count += 1;
  }
  CreateCampos() {
    this.services.GetRestrictions().subscribe(
      response => {
        this.restricciones = response;
      },
      error => {
        console.error(error);

      }
    );
    // Get the size of an object
    this.services.GetFeatures(this.ObjetoSeleccionado[0].url).subscribe(
      response => {
        this.camposFeature = response
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
    let wsurl = this.ObjetoSeleccionado[0].url
    let fechaInicio = this.fechaInicio;
    let fechaFin = this.fechaFinal;
    this.createObjectCategory(this.count)
    this.services.PostObjectRegister(name, model, object, wsurl, fechaInicio, fechaFin, this.createObjectCategory(this.count));
    for (let index = 1; index < this.count + 1; index++) {
      var myNode = document.getElementById("child" + index);
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
    }
    delete this.ObjetoSeleccionado[0].name
    this.campo = []
    this.valorCampo = []
    this.urlInfo = []
    this.description = []
    delete this.ObjetoSeleccionado
    this.count = 0;
  }
}