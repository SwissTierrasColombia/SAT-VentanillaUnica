import { Component, OnInit, Input } from '@angular/core';
import { ObjectEspecialRegimeService } from 'src/app/services/object-especial-regime/object-especial-regime.service';
import { FeaturesObjectEspecial } from 'src/app/models/features-object-especial.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-object-especial',
  templateUrl: './update-object-especial.component.html',
  styleUrls: ['./update-object-especial.component.scss']
})
export class UpdateObjectEspecialComponent implements OnInit {
  @Input() updateObject: any
  @Input() actualizar: boolean
  updateRegister: any
  fechaInicio: Date;
  fechaFinal: Date;
  formcategories = []
  restricciones = [];
  camposFeature: FeaturesObjectEspecial;

  constructor(
    private services: ObjectEspecialRegimeService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    console.log("OBJ TOTAL:", this.updateObject);
    this.fechaInicio = this.updateObject.objSpecialRegime.createAt
    this.fechaFinal = this.updateObject.objSpecialRegime.dueDate

    this.services.GetRestrictions().subscribe(
      (response: any) => {
        for (let i in response) {
          this.restricciones.push({
            "id": 0,
            "restriction": response[i],
            "status": false
          })
        }
        this.formcategories = this.updateObject.categories
        for (let i in this.formcategories) {
          if (this.formcategories[i].restrictions.length < 4) {
            this.comprobarRestricciones(i)
          }
          let auxrestriciones = this.clone(this.restricciones)
          for (let j in this.formcategories[i].restrictions) {
            auxrestriciones = auxrestriciones.map(
              function (item) {
                if (item.restriction.name == this.formcategories[i].restrictions[j].restriction.name) {
                  item["status"] = true;
                }
                return item;
              }.bind(this)
            );
          }
          //console.log("auxrestriciones: ", auxrestriciones);
          this.formcategories[i].restrictions = auxrestriciones;
        }
      }
    );

    this.services.GetFeatures(this.updateObject.objSpecialRegime.wsurl).subscribe(
      response => {
        this.camposFeature = response
      }
    );
  }

  comprobarRestricciones(id: string) {
    for (let index = 0; index < 4; index++) {
      if (this.formcategories[id].restrictions.length < 4) {
        this.formcategories[id].restrictions.push({ "restriction": {} })
      } else {
        continue
      }
    }
  }
  clone(obj: Object) {
    return JSON.parse(JSON.stringify(obj))
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

  volver() {
    window.location.reload()
  }
  actualizarObjeto() {
    let id = this.updateObject.objSpecialRegime.id
    let idorganization = this.updateObject.objSpecialRegime.organization.id
    let name = this.updateObject.objSpecialRegime.organization.name;
    let model = this.updateObject.objSpecialRegime.model;
    let object = this.updateObject.objSpecialRegime.object;
    let wsurl = this.updateObject.objSpecialRegime.wsurl;
    let fechaInicio = this.fechaInicio;
    let fechaFin = this.fechaFinal;
    let dataCategorias = JSON.parse(JSON.stringify(this.formcategories))
    delete dataCategorias.objSpecialRegime
    for (let i in dataCategorias) {
      for (let j in dataCategorias[i].restrictions) {
        delete dataCategorias[i].category.objectSR
        delete dataCategorias[i].category.restrictions
        if (dataCategorias[i].restrictions[j].status == false) {
          delete dataCategorias[i].restrictions[j];
        } else if (dataCategorias[i].restrictions[j].status == true) {
          delete dataCategorias[i].restrictions[j].status;
        }
        const result = dataCategorias[i].restrictions.filter(word => word != null);

        if (j == '3') {
          dataCategorias[i].restrictions = result
        }
      }
    }
    let data = {
      "objSpecialRegime": {
        "id": id,
        "organization": {
          "id": idorganization,
          "name": name
        },
        "model": model,
        "object": object,
        "wsurl": wsurl,
        "createAt": fechaInicio,
        "dueDate": fechaFin
      },
      "categories": dataCategorias
    };
    this.services.updateObjectRegister(data).subscribe(
      _ => {
        this.toastr.success("¡Objeto actualizado!")
        window.location.reload()
      }
    );
  }
  getKeys(item:any){
    return Object.keys(item)
   }
}
