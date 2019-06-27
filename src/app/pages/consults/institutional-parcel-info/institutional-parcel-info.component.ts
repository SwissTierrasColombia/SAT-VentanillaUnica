import { Component } from '@angular/core';
import { QueryService } from 'src/app/services/consult/query.service';
import { PhysicalParcelInfo } from 'src/app/models/physical-parcel-info.interface';

// import PluggableMap from 'ol/PluggableMap.js';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerTile from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { defaults as defaultInteractions } from 'ol/interaction.js';
// import { transform } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS.js';
import { environment } from 'src/environments/environment';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import * as turf from '@turf/turf';

@Component({
  templateUrl: 'institutional-parcel-info.component.html',
  styleUrls: ['./institutional-parcel-info.component.scss']
})
export class InstitutionalParcelInfoComponent {

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


  constructor(private service: QueryService, private toastr: ToastrService) { }

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
      this.service
        .getParcelPhysicalQuery(this.inputFMI, this.inputCadastralCode, this.inputNupre)
        .subscribe(
          data => {
            this.service
              .getBasicConsult(this.inputFMI, this.inputCadastralCode, this.inputNupre)
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
                    this.service.getParcelGeometry(this.physicalInfo.attributes.predio[0].id).subscribe(geom => {
                      this.drawGeometry(geom);
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

      this.service
        .getParcelLegalQuery(this.inputFMI, this.inputCadastralCode, this.inputNupre)
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
          },
          error => {
            console.log(error);
            this.showResult = false;
            this.toastr.error('Datos no encontrados');
          }
        );


    } else {
      this.showResult = false;
      this.toastr.error('Datos no encontrados');
    }
  }
  private getInteresadosInfo() {
    if (this.inputCadastralCode !== '') {
      this.service.getInteresadosQuery('cadastralCode', this.inputCadastralCode).subscribe(
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
      this.service.getInteresadosQuery('nupre', this.inputNupre).subscribe(
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
      this.service.getInteresadosQuery('fmi', this.inputFMI).subscribe(
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

  private drawGeometry(geom: any) {
    // console.log("geom: ", geom);

    this.centroid = turf.centroid(geom);

    const vs = new VectorSource({
      features: (new GeoJSON()).readFeatures(geom)
    });

    const sterreno = new TileWMS({
      url: this.urlGeoserver + 'LADM/wms',
      params: { LAYERS: 'LADM:sat_mapa_base', TILED: true },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });

    const terreno = new LayerTile({
      title: 'Terreno',
      source: sterreno,
      opacity: 1
    });

    const vl = new VectorLayer({
      source: vs,
      style: new Style({
        fill: new Fill({
          color: 'rgba(96, 58, 58, 0.1)'
        }),
        stroke: new Stroke({
          color: '#ff2929',
          width: 5
        }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: 'rgba(96, 58, 58, 0.2)'
          }),
          stroke: new Stroke({
            color: '#319FD3',
            width: 1
          })
        })
      })
    });

    const v = new View({ projection: 'EPSG:3857' });
    const polygon = vs.getFeatures()[0].getGeometry();
    v.fit(polygon, { size: [500, 500] });
    const m = new Map({
      interactions: defaultInteractions({
        doubleClickZoom: true,
        dragAndDrop: true,
        dragPan: true,
        keyboardPan: true,
        keyboardZoom: true,
        mouseWheelZoom: false,
        pointer: true,
        select: true
      }),
      target: 'map',
      layers: [
        this.getBaseMap('googleLayerSatellite', 1),
        this.getBaseMap('googleLayerOnlyRoad', 0.5),
        terreno,
        vl
      ],
      view: v
    });

    return m;

  }

  private getBaseMap(type: string, op: number) {
    let source = '';
    switch (type) {
      case 'googleLayerRoadNames': source = 'http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}'; break;
      case 'googleLayerRoadmap': source = 'http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}'; break;
      case 'googleLayerSatellite': source = 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}'; break;
      case 'googleLayerHybrid': source = 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'; break;
      case 'googleLayerTerrain': source = 'http://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}'; break;
      case 'googleLayerHybrid2': source = 'http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'; break;
      case 'googleLayerOnlyRoad': source = 'http://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'; break;
      case 'OSM': source = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'; break;
    }
    if (source !== '') {
      return new LayerTile({
        title: type,
        source: new XYZ({
          url: source
        }),
        opacity: op
      });
    } else {
      return null;
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
      //vertical linea separación mapa de info fisica
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
      let ID = '';
      // tslint:disable-next-line:variable-name
      let Nombre_Completo = '';
      // tslint:disable-next-line:variable-name
      let Tipo_Derecho = '';
      let Derecho = '';
      let Vigencia = '';
      // tslint:disable-next-line:variable-name
      let Tipo_Documento = '';
      let Estado = '';
      this.lealInfoDercho.forEach(element => {
        ID = element.attributes['Código registral'];
        // tslint:disable-next-line:no-string-literal
        Nombre_Completo = element.attributes['col_fuenteadministrativa']['0']['attributes']['Nombre'];
        Tipo_Derecho = element.attributes['Tipo de derecho'];
        Derecho = '';
        Vigencia = '';
        // tslint:disable-next-line:no-string-literal
        Tipo_Documento = element.attributes['col_fuenteadministrativa']['0']['attributes']['Tipo de fuente administrativa'];
        // tslint:disable-next-line:no-string-literal
        Estado = element.attributes['col_fuenteadministrativa']['0']['attributes']['Estado disponibilidad'];
      });
      doc.text('Derechos', 20, 425);
      doc.autoTable({
        margin: 20,
        tableWidth: 396.46,
        startY: 430,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
        theme: 'grid',
        head: [[ID, 'Nombre Completo', 'Tipo Derecho', '% Derecho', 'Vigencia', 'Tipo Documento', 'Estado']],
        body: [
          [ID, Nombre_Completo, Tipo_Derecho, Derecho, Vigencia, Tipo_Documento, Estado]
        ]
      });
      let Codigo: any;
      // tslint:disable-next-line:variable-name
      let Objeto_que_afecta: any;
      // tslint:disable-next-line:variable-name
      let Área_afectada: any;
      // tslint:disable-next-line:variable-name
      let de_afectacion: any;
      // tslint:disable-next-line:variable-name
      const Fecha_constitución = '--';
      // tslint:disable-next-line:variable-name
      const Fecha_expiracion = '--';
      // tslint:disable-next-line:variable-name
      const Estado_Afectaciones = 'Activo';
      this.admInfo.forEach(element => {
        Codigo = element.t_id ? element.t_id : '--';
        Objeto_que_afecta = element.objeto ? element.objeto : '--';
        Área_afectada = element.area ? element.area : '--';
        de_afectacion = element.proportion * 100 ? element.proportion : '--';
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
        body: [
          [Codigo, Objeto_que_afecta, Área_afectada, de_afectacion, Fecha_constitución, Fecha_expiracion, Estado_Afectaciones]
        ]
      });

      doc.setFontSize(9);
      doc.text('Fuente de consulta: ', 15, 600);
      doc.text('http://localhost:4200/#/consults/institutional-parcel-info?fmi=' + this.inputFMI, 15, 609.4175);
      doc.text('Código de verificación: XXX-XXXXXX', 310, 25);

      // tslint:disable-next-line:variable-name
      const Delegacion_Catastral = 'SUCRE';
      // tslint:disable-next-line:variable-name
      const Municipio_del_Predio = 'OVEJAS';
      // tslint:disable-next-line:variable-name
      const Ubicación_del_Predio = '--';
      // tslint:disable-next-line:variable-name
      const Dirección_del_Predio = '311_2_nombre_calle';
      // tslint:disable-next-line:variable-name
      const Numero_Catastral = this.physicalInfo.attributes.predio[0].attributes['Número predial'];
      // tslint:disable-next-line:variable-name
      const Area_Catastral = '' + this.physicalInfo.attributes['Área calculada [m2]'];
      // tslint:disable-next-line:no-string-literal variable-name
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
    // tslint:disable-next-line:no-string-literal
    newImg.src = this.service.getTerrainGeometryImage(this.physicalInfo['id']);
  }

}
