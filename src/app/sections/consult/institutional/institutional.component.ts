import { Component, OnInit } from '@angular/core';
import { PhysicalParcelInfo } from 'src/app/models/physical-parcel-info.interface';

import { environment } from 'src/environments/environment';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/services/vu/query.service';
import { DepartamentsService } from 'src/app/services/vu/departaments.service';
import { ParcelsService } from 'src/app/services/RDM/parcels.service';

@Component({
  selector: 'app-institutional',
  templateUrl: './institutional.component.html',
  styleUrls: ['./institutional.component.scss']
})
export class InstitutionalComponent implements OnInit {

  showResult = false;
  inputNupre;
  inputFMI;
  inputCadastralCode;
  tab = 1;
  tipoBusqueda = 1;
  physicalInfo: PhysicalParcelInfo;
  basicData: any;
  legalInfo: any;
  lealInfoDercho: any;
  admInfo: any = [
    ''
  ];
  urlGeoserver: string = environment.geoserver;
  interesadosInfo: any;
  infoSolicitudConservacion = [];
  urlQR: string = environment.qr_base_url;
  image: any;
  docG = new jspdf('portrait', 'px', 'a4');
  centroid = {
    geometry: { coordinates: [0, 0] }
  };
  departamento: boolean;
  allDepartaments: any;
  idSelectDepartament: string;
  allminucipalities: any;
  idMunicipality: string;
  dataRecords: any;
  extralayers: any;
  geom: any;

  constructor(
    private service: QueryService,
    private toastr: ToastrService,
    private serviceDepartament: DepartamentsService,
    private serviceRDM: ParcelsService
  ) {
    this.departamento = false;
    this.idSelectDepartament = '';
    this.idMunicipality = '';
    this.extralayers = {
      versions: []
    };
  }

  ngOnInit(): void {
    this.serviceDepartament.GetDepartaments().subscribe(
      data => {
        this.allDepartaments = data;
        console.log("this.allDepartaments: ", this.allDepartaments);

      }
    )
  }
  changeDepartament() {
    this.serviceDepartament.GetMunicipalitiesByDeparment(this.idSelectDepartament).subscribe(
      data => {
        this.allminucipalities = data;
        console.log("this.allminucipalities: ", this.allminucipalities);

      }
    )
  }
  selectMunicipality() {
    this.departamento = true;
  }
  volver() {
    this.departamento = false;
  }
  /**/

  selectTypeSearch(id) {
    this.inputCadastralCode = '';
    this.inputFMI = '';
    this.inputNupre = '';
    this.tipoBusqueda = id;
  }

  search() {
    this.showResult = false;
    this.inputFMI = this.inputFMI.trim();
    this.inputCadastralCode = this.inputCadastralCode.trim();
    this.inputNupre = this.inputNupre.trim();
    if (this.inputNupre || this.inputFMI || this.inputCadastralCode) {
      this.getInteresadosInfo();
      this.serviceRDM
        .GetInformationPhysicalParcel(this.idMunicipality, this.inputFMI, this.inputCadastralCode, this.inputNupre)
        .subscribe(
          data => {
            this.serviceRDM
              .GetBasicInformationParcel(this.idMunicipality, this.inputNupre, this.inputCadastralCode, this.inputFMI)
              .subscribe(
                basicData => {
                  this.physicalInfo = data[0] ? data[0] : [];
                  this.basicData = basicData ? basicData : [];
                  if (this.physicalInfo.hasOwnProperty('attributes')) {
                    this.service
                      .getAdministrativeQuery(this.physicalInfo.id)
                      .subscribe(
                        (admData: any) => {
                          if (admData.length) {
                            this.admInfo = admData;
                          }
                        },
                        error => {
                          console.log(error);
                          this.showResult = false;
                          this.toastr.error('Datos no encontrados');
                        }
                      );
                    this.serviceRDM.GetGeometryInformationParcel(this.idMunicipality, this.physicalInfo.attributes.predio[0].id).subscribe(geom => {
                      this.geom = geom;
                      this.extralayers = this.allminucipalities.find((obj) => {
                        if (obj._id === this.idMunicipality) {
                          return obj;
                        }
                      });
                      console.log(this.geom, this.extralayers);
                      
                    });
                    this.showResult = true;

                  }
                });
          },
          error => {
            console.log(error);
            this.showResult = false;
            this.toastr.error('Datos no encontrados');
          }
        );

      this.serviceRDM
        .GetInformationLegalParcel(this.idMunicipality, this.inputFMI, this.inputCadastralCode, this.inputNupre)
        .subscribe(
          (data: any) => {
            if (data.length) {
              // tslint:disable-next-line:no-string-literal
              this.legalInfo = data[0]['attributes']['predio'][0]['attributes'];
              // tslint:disable-next-line:no-string-literal
              this.lealInfoDercho = data[0]['attributes']['predio'][0]['attributes']['col_derecho'];
              // tslint:disable-next-line:no-string-literal
              // console.log(data[0]['attributes']['predio'][0]);

            }
          }
        );
      if (this.inputNupre) {
        this.getRecord('nupre', this.inputNupre)
      } else if (this.inputCadastralCode) {
        this.getRecord('cadastralCode', this.inputCadastralCode)
      } else if (this.inputFMI) {
        this.getRecord('fmi', this.inputFMI)
      }

    } else {
      this.showResult = false;
      this.toastr.error('Datos no encontrados');
    }
  }
  private getInteresadosInfo() {
    if (this.inputCadastralCode !== '') {
      this.serviceRDM.GetInformationPartyParcel(this.idMunicipality, 'cadastralCode', this.inputCadastralCode).subscribe(
        data => {
          this.interesadosInfo = data;
          // console.log(Object.values(this.interesadosInfo)[0]);
          if (Object.values(this.interesadosInfo)[0] === 'No se encontraron registros.') {
            this.toastr.error('No se encontraron registros.');
          }
        }
      );
    }
    if (this.inputNupre !== '') {
      this.serviceRDM.GetInformationPartyParcel(this.idMunicipality, 'nupre', this.inputNupre).subscribe(
        data => {
          this.interesadosInfo = data;
          // console.log(Object.values(this.interesadosInfo)[0]);
          if (Object.values(this.interesadosInfo)[0] === 'No se encontraron registros.') {
            this.toastr.error('No se encontraron registros.');
          }
        }
      );
    }
    if (this.inputFMI !== '') {
      this.serviceRDM.GetInformationPartyParcel(this.idMunicipality, 'fmi', this.inputFMI).subscribe(
        data => {
          this.interesadosInfo = data;
          // console.log(Object.values(this.interesadosInfo)[0]);
          if (Object.values(this.interesadosInfo)[0] === 'No se encontraron registros.') {
            this.toastr.error('No se encontraron registros.');
          }
        }
      );
    }
  }

  public onKey(event: any) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  public xOffset(text) {
    return (this.docG.internal.pageSize.width / 2) - (this.docG.getStringUnitWidth(text) * this.docG.internal.getFontSize() / 2);
  }

  public generatepdf() {
    const doc = new jspdf('portrait', 'px', 'a4');
    doc.setFontSize(12);
    const newImg = new Image();
    // tslint:disable-next-line:space-before-function-paren
    newImg.onload = function () {
      const typeNumber = 4;
      const errorCorrectionLevel = 'L';
      const qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData('http://localhost:4200/#/consults/basic-parcel-info?fmi=' + this.inputFMI);
      qr.make();
      const text = 'SAT Consulta Institucional';
      const Imageqr = qr.createDataURL();
      const imagenlogo = new Image();
      imagenlogo.src = 'assets/img/brand/logo.png';
      // horizontal line margen
      doc.setLineWidth(1);
      doc.line(10, 10, 426.46, 10);
      doc.line(10, 611.4175, 426.46, 611.4175);
      // vertical line margen
      doc.line(10, 611.4175, 10, 10);
      doc.line(426.46, 611.4175, 426.46, 10);
      // vertical separar logo SAT
      doc.line(140, 85, 140, 10);
      // vertical separar logo QR
      doc.line(300, 85, 300, 10);
      // horizontal margen titulo
      doc.line(10, 85, 426.46, 85);
      // image LOGO SAT
      doc.addImage(imagenlogo, 25, 25, 100, 52);
      // titulo pdf
      doc.text(text, this.xOffset(text) + 15, 50);
      // imagen QR
      doc.addImage(Imageqr, 340, 25);
      doc.text('Verdad Física', 190, 100);
      // horizontal margen titulo Fisica
      doc.line(10, 112, 426.46, 112);
      // vertical linea separación mapa de info fisica
      doc.line(220, 112, 220, 320);

      // const imagenverdadfisica = new Image();
      // imagenverdadfisica.src = 'assets/VerdadFisica.png';
      // doc.addImage(imagenverdadfisica, 20, 120, 190, 190);

      // MAPA
      doc.addImage(newImg, 'PNG', 240, 130, 170, 170);
      // horizantal mapa
      doc.line(10, 320, 426.46, 320);
      doc.text('Históricos', 190, 335);
      doc.line(10, 340, 426.46, 340);
      doc.text('Solicitudes de Conservación Radicadas', 20, 355);
      doc.autoTable({
        margin: 20,
        startY: 360,
        tableWidth: 396.46,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
        theme: 'grid',
        // tslint:disable-next-line:max-line-length
        head: [['Radicación', 'Nº Solicitud', 'Fecha Solicitud', 'Estado', 'Tipo Solicitud', 'Modifica Identificador', 'Modifica Geometría', 'Estado del trámite']],
        body: [
          ['654654', '565654654', '2016-05-06', 'RADICADO', 'Compraventa Total', 'No', 'Si', 'Finalizado']
        ]
      });
      let Derecho = '--';
      let Vigencia = '--';
      let Estado = '--';
      var bodyDerechos = []
      this.lealInfoDercho.forEach(element => {
        bodyDerechos.push(
          [element.attributes['Código registral'] ? element.attributes['Código registral'] : '--', element.attributes['col_fuenteadministrativa']['0']['attributes']['Nombre'] ? element.attributes['col_fuenteadministrativa']['0']['attributes']['Nombre'] : '--', Derecho, Vigencia, element.attributes['col_fuenteadministrativa']['0']['attributes']['Tipo de fuente administrativa'] ? element.attributes['col_fuenteadministrativa']['0']['attributes']['Tipo de fuente administrativa'] : '--', element.attributes['col_fuenteadministrativa']['0']['attributes']['Estado disponibilidad'] ? element.attributes['col_fuenteadministrativa']['0']['attributes']['Estado disponibilidad'] : '--']
        )
      });
      doc.text('Derechos', 20, 425);
      doc.autoTable({
        margin: 20,
        tableWidth: 396.46,
        startY: 430,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
        theme: 'grid',
        head: [['ID', 'Nombre Completo', 'Tipo Derecho', '% Derecho', 'Vigencia', 'Tipo Documento', 'Estado']],
        body: bodyDerechos
      });
      const Fecha_constitución = '--';
      const Fecha_expiracion = '--';
      const Estado_Afectaciones = 'Activo';
      var bodyAfectaciones = []

      this.admInfo.forEach(element => {
        bodyAfectaciones.push([element.t_id ? element.t_id : '--', element.objeto ? element.objeto : '--', element.area ? element.area : '--', element.proportion ? element.proportion : '--', Fecha_constitución, Fecha_expiracion, Estado_Afectaciones])
      });
      doc.text('Afectaciones', 20, 480);
      doc.autoTable({
        margin: 20,
        tableWidth: 396.46,
        startY: 485,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
        theme: 'grid',
        head: [['Código', 'Objeto que afecta', 'Área afectada', '% de afectación', 'Fecha constitución', 'Fecha expiración', 'Estado']],
        body: bodyAfectaciones
      });
      if (this.dataRecords.length > 0) {
        let bodyAntecedentes = []
        this.dataRecords.forEach(element => {
          element.attributes.predio.forEach(item => {
            bodyAntecedentes.push(
              [item.attributes.Nombre, item.attributes.NUPRE, item.attributes.FMI, item.attributes['Número predial'], item.attributes['Número predial anterior'], element.attributes['Área de terreno [m2]']]
            )
          });
        });
        doc.text('Antecedentes', 20, 530);
        doc.autoTable({
          margin: 20,
          tableWidth: 396.46,
          headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
          head: [['Nombre', 'Nupre', 'FMI', 'Número predial', 'Número predial anterior', 'Área terreno']],
          body: bodyAntecedentes
        });
      }
      doc.setFontSize(9);
      doc.text('Fuente de consulta: ', 15, 600);
      doc.text('http://localhost:4200/#/consults/institutional-parcel-info?fmi=' + this.inputFMI, 15, 609.4175);
      doc.text('Código de verificación: XXX-XXXXXX', 310, 25);

      const Delegacion_Catastral = 'SUCRE';
      const Municipio_del_Predio = 'OVEJAS';
      const Ubicación_del_Predio = '--';
      const Dirección_del_Predio = '311_2_nombre_calle';
      const Numero_Catastral = this.physicalInfo.attributes.predio[0].attributes['Número predial'];
      const Area_Catastral = '--' + this.physicalInfo.attributes['Área calculada [m2]'];
      const Tipo_de_Parcela = this.physicalInfo.attributes.predio[0].attributes['Tipo'];
      Estado = 'ACTIVO';
      doc.text(Delegacion_Catastral, 100, 130);
      doc.text(Municipio_del_Predio, 100, 155);
      doc.text(Ubicación_del_Predio, 100, 180);
      doc.text(Dirección_del_Predio, 100, 205);
      doc.text(Numero_Catastral, 100, 230);
      doc.text(Area_Catastral, 100, 255);
      doc.text(Tipo_de_Parcela, 100, 280);
      doc.text(Estado, 100, 305);
      doc.setFontSize(10);
      doc.setFontType('bold');
      // Contenido Verdad Fisica
      doc.text('Delegación Catastral:', 20, 130);
      doc.text('Municipio del Predio:', 20, 155);
      doc.text('Ubicación del Predio:', 20, 180);
      doc.text('Dirección del Predio:', 20, 205);
      doc.text('Número Catastral:', 20, 230);
      doc.text('Área Catastral (m2):', 20, 255);
      doc.text('Tipo de Parcela:', 20, 280);
      doc.text('Estado:', 20, 305);

      doc.save('ConsultaInstitucional.pdf'); // Generated PDF
    }.bind(this);

    newImg.src = this.serviceRDM.GetImageGeometryParcel(this.idMunicipality, this.physicalInfo['id']);
  }
  getRecord(tipo: string, idTipo: string) {
    this.serviceRDM.GetBasicInformationParcelRecord(this.idMunicipality, tipo, idTipo).subscribe(
      data => {
        this.dataRecords = data;
        console.log("this.dataRecords", this.dataRecords);
      }
    );
  }

}
