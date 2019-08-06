import { Component, OnInit, Input } from '@angular/core';
import { ObjectEspecialRegimeService } from 'src/app/services/object-especial-regime/object-especial-regime.service';

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
  formcategories: any;
  restricciones: any;
  camposFeature: import("/home/andres/work/SAT-VentanillaUnica/src/app/models/features-object-especial.interface").FeaturesObjectEspecial;

  constructor(private services: ObjectEspecialRegimeService) { }

  ngOnInit() {
    console.log(this.updateObject);
    this.fechaInicio = this.updateObject.objSpecialRegime.createAt
    this.fechaFinal = this.updateObject.objSpecialRegime.dueDate

    this.services.GetRestrictions().subscribe(
      response => {
        for (let i in response) {
          this.restricciones.push({
            "id": 0,
            "restriction": response[i],
            "status": false
          })
        }
        console.log(this.restricciones);
      },
      error => {
        console.error("error restricciones: ", error);
      }
    );

    this.services.GetFeatures(this.updateObject.objSpecialRegime.wsurl).subscribe(
      response => {
        this.camposFeature = response
      },
      error => {
        console.error(error);

      }
    );
    this.formcategories = this.updateObject.categories

    for (let i in this.formcategories) {
      for (let j = 0; j < this.restricciones.lenght; j++) {
        if (this.formcategories[i].restrictions[j] == this.restricciones[j]) {
          this.formcategories[i].restrictions[j].status = true;
        } else {
          this.formcategories[i].restrictions[j] = this.restricciones[j].restriction;
        }
      }
    }
  }

  createCategory() {
    this.formcategories.push({
      "category": {
        "id": this.formcategories.length,
      },
      restrictions: JSON.parse(JSON.stringify(this.restricciones))
    })

  }

  deleteCategory(id: number) {
    this.formcategories.splice(id, 1)
  }

  actualizarObjeto() {
    this.actualizar = false
  }
  volver() {
    window.location.reload()
  }
}
