import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ObjectEspecialRegimeService } from 'src/app/services/object-especial-regime/object-especial-regime.service';

@Component({
  selector: 'app-registro-obj-especial',
  templateUrl: './registro-obj-especial.component.html',
  styleUrls: ['./registro-obj-especial.component.scss']
})

export class RegistroObjEspecialComponent implements OnInit {

  models: ModelsEspecialRegime;
  constructor(private services: ObjectEspecialRegimeService) {
  }

  ngOnInit() {
    this.services.GetDataModel(1).subscribe(
      response => {
        this.models = response
        console.log(this.models);

      },
      error => {
        console.log(error);

      }

    )
  }

  createCategory() {
    var node = document.createElement("DIV");
    var itm = document.getElementById("child").lastChild;
    var cln = itm.cloneNode(true);
    node.appendChild(cln);
    document.getElementById("Nodo").appendChild(node);
  }
}
