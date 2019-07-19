import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ObjectEspecialRegimeService } from 'src/app/services/object-especial-regime/object-especial-regime.service';
import { RestrictionsObjectEspecial } from 'src/app/models/restrictions-object-especial';
import { ModelsEspecialRegime } from 'src/app/models/models-especial-regime.interface';
import { FeaturesObjectEspecial } from 'src/app/models/features-object-especial.interface';

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
  restricciones: RestrictionsObjectEspecial;
  camposFeature: FeaturesObjectEspecial;
  constructor(private services: ObjectEspecialRegimeService) {
  }

  ngOnInit() {
    this.services.GetDataModel(1).subscribe(
      response => {
        this.entityModels = response;
      },
      error => {
        console.log(error);

      }
    );
    this.services.GetRestrictions().subscribe(
      response => {
        this.restricciones = response;
      },
      error => {
        console.error(error);

      }
    );

  }
  createCategory() {
    var node = document.createElement("DIV");
    var itm = document.getElementById("child").lastChild;
    var cln = itm.cloneNode(true);
    node.appendChild(cln);
    document.getElementById("Nodo").appendChild(node);
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
  }
}
