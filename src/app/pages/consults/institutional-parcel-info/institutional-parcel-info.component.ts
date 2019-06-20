import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/services/consult/query.service';
import { PhysicalParcelInfo } from 'src/app/models/physical-parcel-info.interface';

import PluggableMap from 'ol/PluggableMap.js';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerTile from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { defaults as defaultInteractions } from 'ol/interaction.js';
import { transform } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS.js';
import { environment } from 'src/environments/environment';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';



@Component({
  templateUrl: 'institutional-parcel-info.component.html'
})
export class InstitutionalParcelInfoComponent implements OnInit {

  showResult = false;
  inputNupre;
  inputFMI;
  inputCadastralCode;
  tab = 1;
  tipoBusqueda = 1;
  physicalInfo: PhysicalParcelInfo;
  basicData: any;
  legalInfo: any;
  urlGeoserver: string = environment.geoserver;
  interesadosInfo: any;
  infoSolicitudConservacion = [];
  urlQR: string = environment.qr_base_url;
  image: any;
  docG = new jspdf('portrait', 'px', 'a4');




  constructor(private service: QueryService, private toastr: ToastrService) { }

  ngOnInit() {

  }

  selectTypeSearch(id) {
    this.inputCadastralCode = '';
    this.inputFMI = '';
    this.inputNupre = '';
    this.tipoBusqueda = id;
  }

  search() {
    this.showResult = false
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
            this.toastr.error('Datos no encontrados')
          }
        );

      this.service
        .getParcelLegalQuery(this.inputFMI, this.inputCadastralCode, this.inputNupre)
        .subscribe(
          (data: any) => {
            if (data.length) {
              this.legalInfo = data[0]['attributes']['predio'][0]['attributes'];
            }
          },
          error => {
            console.log(error);
            this.showResult = false;
            this.toastr.error('Datos no encontrados')
          }
        );
    } else {
      this.showResult = false;
      this.toastr.error('Datos no encontrados')
    }
  }
  private getInteresadosInfo() {
    if (this.inputCadastralCode != '') {
      this.service.getInteresadosQuery('cadastralCode', this.inputCadastralCode).subscribe(
        data => {
          this.interesadosInfo = data;
          //console.log(Object.values(this.interesadosInfo)[0]);
          if (Object.values(this.interesadosInfo)[0] == "No se encontraron registros.") {
            this.toastr.error("No se encontraron registros.");
          }
        }
      );
    }
    if (this.inputNupre != '') {
      this.service.getInteresadosQuery('nupre', this.inputNupre).subscribe(
        data => {
          this.interesadosInfo = data;
          //console.log(Object.values(this.interesadosInfo)[0]);
          if (Object.values(this.interesadosInfo)[0] == "No se encontraron registros.") {
            this.toastr.error("No se encontraron registros.");
          }
        }
      );
    }
    if (this.inputFMI != '') {
      this.service.getInteresadosQuery('fmi', this.inputFMI).subscribe(
        data => {
          this.interesadosInfo = data;
          //console.log(Object.values(this.interesadosInfo)[0]);
          if (Object.values(this.interesadosInfo)[0] == "No se encontraron registros.") {
            this.toastr.error("No se encontraron registros.");
          }
        }
      );
    }
  }

  private drawGeometry(geom: any) {
    console.log("geom: ", geom);



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
    if (event.key === "Enter") {
      this.search();
    }
  }

  public xOffset(text) {
    return (this.docG.internal.pageSize.width / 2) - (this.docG.getStringUnitWidth(text) * this.docG.internal.getFontSize() / 2);
  }
  
  public generatepdf() {
    let doc = new jspdf('portrait', 'px', 'a4');
    let newImg = new Image();
    newImg.onload = function () {
      const typeNumber = 4;
      const errorCorrectionLevel = 'L';
      const qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData('http://localhost:4200/#/consults/basic-parcel-info?fmi=' + this.inputFMI);
      qr.make();
      let text = "SAT Consulta Institucional"
      let Imageqr = qr.createDataURL();
      var imagenlogo = new Image();
      imagenlogo.src = "assets/img/brand/logo.png";
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
      doc.addImage(imagenlogo, 25, 25, 100, 40);
      // titulo pdf
      doc.text(text, this.xOffset(text) + 15, 50);
      // imagen QR
      doc.addImage(Imageqr, 340, 25);
      doc.text("Verdad Física", 190, 100);
      // horizontal margen titulo Fisica
      doc.line(10, 112, 426.46, 112);
      doc.line(213, 112, 213, 320);

      var imagenverdadfisica = new Image();
      imagenverdadfisica.src = "assets/VerdadFisica.png";
      doc.addImage(imagenverdadfisica, 20, 120, 190, 190);

      //MAPA
      doc.addImage(newImg, 'PNG', 240, 130, 170, 170);
      // horizantal mapa
      doc.line(10, 320, 426.46, 320);
      doc.text("Históricos", 190, 335);
      doc.line(10, 340, 426.46, 340);
      doc.text("Solicitudes de Conservación Radicadas", 20, 355);
      doc.autoTable({
        margin: 20,
        startY: 360,
        tableWidth: 396.46,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
        theme: 'grid',
        head: [["Radicación", "Nº Solicitud", "Fecha Solicitud", "Estado", "Tipo Solicitud", "Modifica Identificador", "Modifica Geometría", "Estado del trámite"]],
        body: [
          ["654654", "565654654", "2016-05-06", "RADICADO", "Compraventa Total", "No", "Si", "Finalizado"]
        ]
      });
      doc.text("Derechos", 20, 425);
      doc.autoTable({
        margin: 20,
        tableWidth: 396.46,
        startY: 430,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
        theme: 'grid',
        head: [["ID", "Nombre Completo", "Tipo Derecho", "% Derecho", "Vigencia", "Tipo Documento", "Estado"]],
        body: [
          ["1", "GARCIA PEREZ, RAMON ORLANDO", "DOMINIO PLENO", "100", "2016-02-16", "ESCRITURA", "INACTIVO"]
        ]
      });
      doc.text("Afectaciones", 20, 480);
      doc.autoTable({
        margin: 20,
        tableWidth: 396.46,
        startY: 485,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
        theme: 'grid',
        head: [["Código", "Objeto que afecta", "Área afectada", "% de afectación", "Fecha constitución", "Fecha expiración", "Estado"]],
        body: [
          ["4654", "Centro histórico - Municipio de Ovejas", "1.300,47", "100%", "2017-02-09", "2019-02-02", "Activo"]
        ]
      });
      /*       
            doc.text("SUCRE", 95, 130);
            doc.text("OVEJAS", 95, 140);
            doc.text("", 95, 150);
            doc.text("311_2_nombre_calle", 95, 160);
            doc.text("253940000000000230241000000000", 95, 170);
            doc.text("7307.3", 95, 180);
            doc.text("PropiedadHorizontal.Matriz", 95, 190);
            doc.text("ACTIVO", 95, 200);
            doc.text("Catastro Municipal", 95, 210); */
      doc.setFontSize(9);
      doc.text("Fuente de consulta: ", 15, 600)
      doc.text('http://localhost:4200/#/consults/institutional-parcel-info?fmi=' + this.inputFMI, 15, 609.4175);
      doc.text('Código de verificación: XXX-XXXXXX', 310, 25);

      /*       doc.setFontType("bold");
            doc.setFontSize(10);
            //Contenido Verdad Fisica
            doc.text("Delegación Catastral", 20, 130);
            doc.text("Municipio del Predio", 20, 140);
            doc.text("Ubicación del Predio", 20, 150);
            doc.text("Dirección del Predio", 20, 160);
            doc.text("Número Catastral", 20, 170);
            doc.text("Área Catastral (m2)", 20, 180);
            doc.text("Tipo de Parcela", 20, 190);
            doc.text("Estado", 20, 200);
            doc.text("Otros Datos", 20, 210); */


      doc.save('ConsultaInstitucional.pdf'); // Generated PDF
    }.bind(this);
    newImg.src = this.service.getTerrainGeometryImage(this.physicalInfo['id']);
  }

}
