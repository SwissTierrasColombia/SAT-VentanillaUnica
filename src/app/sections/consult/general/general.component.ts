import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { BasicConsult } from 'src/app/models/basic-parcel-info.interface';


import Map from 'ol/Map';
import View from 'ol/View';
import LayerTile from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import XYZ from 'ol/source/XYZ';
import ImageWMS from 'ol/source/ImageWMS';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { defaults as defaultInteractions } from 'ol/interaction.js';
import TileWMS from 'ol/source/TileWMS.js';
import { environment } from 'src/environments/environment';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import * as turf from '@turf/turf';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from 'src/app/services/vu/query.service';
import { DepartamentsService } from 'src/app/services/vu/departaments.service';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  // @ViewChild('buscarNumeroPredial') numPredialCheck: ElementRef;
  showResult = false;
  inputNupre = '';
  inputFMI = '';
  inputCadastralCode = '';
  basicConsult: any;
  image: any;
  departamento: boolean;
  docG = new jspdf('portrait', 'px', 'a4');
  urlGeoserver: string = environment.geoserver;
  urlQR: string = environment.qr_base_url;
  tipoBusqueda = 1;
  allDepartaments: any;
  idSelectDepartament: string;
  allminucipalities: any;
  idMunicipality: string;
  centroid = {
    geometry: { coordinates: [0, 0] }
  };

  constructor(private service: QueryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private serviceDepartament: DepartamentsService
  ) {
    this.departamento = false;
    this.idSelectDepartament = '';
    this.idMunicipality = '';
  }

  ngOnInit() {
    this.serviceDepartament.GetDepartaments().subscribe(
      data => {
        this.allDepartaments = data;
        console.log("this.allDepartaments: ", this.allDepartaments);

      }
    )
    this.route.queryParamMap.subscribe(
      params => {
        if (params.has("t_id")) {
          //arams.get('tid')
          console.log("llegue: ", params.get('t_id'));
          this.service.getCadastralCode(Number(params.get('t_id'))).subscribe((result: any) => {
            console.log(result);
            if (result) {
              this.selectTypeSearch(2);
              this.inputCadastralCode = result.numero_predial;
              this.search();
              // this.numPredialCheck.nativeElement.checked = true;
            } else {
              this.toastr.error('No se encontraron registros.');
            }
          });
        }
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
  selectTypeSearch(id) {
    this.inputCadastralCode = '';
    this.inputFMI = '';
    this.inputNupre = '';
    this.tipoBusqueda = id;
  }
  search() {
    // tslint:disable-next-line:triple-equals
    if (this.inputNupre != '' || this.inputCadastralCode != '' || this.inputFMI != '') {
      this.inputFMI = this.inputFMI.trim();
      this.inputCadastralCode = this.inputCadastralCode.trim();
      this.inputNupre = this.inputNupre.trim();
      this.getBasicInfo();
    } else {
      this.showResult = false;
    }
  }

  getBasicInfo() {
    this.service
      .getBasicConsult(this.inputFMI, this.inputCadastralCode, this.inputNupre)
      .subscribe(
        data => {

          // tslint:disable-next-line:no-string-literal
          if (data['error']) {
            // tslint:disable-next-line:no-string-literal
            //console.log(data['error']);
            this.showResult = false;
            this.toastr.error('No se encontraron registros.');
          } else {
            this.basicConsult = [data[0]];
            this.service.getTerrainGeometry(this.basicConsult[0].id).subscribe(geom => {
              this.drawGeometry(geom);
            });
            this.showResult = true;
          }
        }
      );
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

  private drawGeometry(geom: any) {
    console.log('geo', JSON.stringify(geom));

    /*
    const m = new Map('map' + this.basicConsult[0].id, {
      crs: CRS.EPSG3857
    });

    new TileLayer('http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}', {
      crs: CRS.EPSG3857
    }).addTo(m);

    const parcel = geoJSON(geom, {
      style: {
        fillColor: '#BD0026',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      }
    }).addTo(m);

    m.fitBounds(parcel.getBounds());

    //LADM:vw_terreno

    */

    this.centroid = turf.centroid(geom);

    const vs = new VectorSource({
      features: (new GeoJSON()).readFeatures(geom)
    });
    /*
        const sterreno = new TileWMS({
          url: this.urlGeoserver + 'LADM/wms',
          params: { LAYERS: 'LADM:sat_mapa_base' },
          serverType: 'geoserver',
          crossOrigin: 'anonymous'
        });
    */
    const sterreno = new ImageLayer({
      source: new ImageWMS({
        ratio: 1,
        url: this.urlGeoserver + 'LADM/wms',
        params: {
          FORMAT: 'image/png',
          VERSION: '1.1.1',
          LAYERS: 'LADM:sat_mapa_base',
          exceptions: 'application/vnd.ogc.se_inimage',
        }
      })
    });
    /*
        const terreno = new LayerTile({
          title: 'Terreno',
          source: sterreno,
          opacity: 1
        });
        */


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
        mouseWheelZoom: true,
        pointer: true,
        select: true
      }),
      target: 'map' + this.basicConsult[0].id,
      layers: [
        this.getBaseMap('googleLayerSatellite', 1),
        this.getBaseMap('googleLayerOnlyRoad', 0.5),
        sterreno,
        vl
      ],
      view: v
    });

    return m;

  }
  public xOffset(text) {
    return (this.docG.internal.pageSize.width / 2) - (this.docG.getStringUnitWidth(text) * this.docG.internal.getFontSize() / 2);
  }
  public captureScreen() {
    // Few necessary setting options 216 x 279 tamaño carta
    const doc = new jspdf('portrait', 'px', 'a4');
    const newImg = new Image();
    // tslint:disable-next-line:space-before-function-paren
    newImg.onload = function () {
      let tipo = '--';
      let nombre = '--';
      let departamento = '--';
      let Municipio = '--';
      let Zona = '--';
      let NUPRE = '--';
      let FMI = '--';
      let Npredial = '--';
      let NpredialAnterior = '--';
      let terreno = '--';
      let País = '--';
      let Departamento = '--';
      let Ciudad = '--';
      let codigoPostal = '--';
      // tslint:disable-next-line:variable-name
      let Apartado_correo = '--';
      // tslint:disable-next-line:variable-name
      let Nombre_calle = '--';
      this.basicConsult.forEach(element => {
        // Terreno
        terreno = element.attributes['Área de terreno [m2]'] ? element.attributes['Área de terreno [m2]'] : '--';
        element.attributes.predio.forEach((e: any) => {
          // Predio
          tipo = e.attributes.Tipo ? e.attributes.Tipo : '--';
          nombre = e.attributes.Nombre ? e.attributes.Nombre : '--';
          departamento = e.attributes.Departamento ? e.attributes.Departamento : '--';
          Municipio = e.attributes.Municipio ? e.attributes.Municipio : '--';
          Zona = e.attributes.Zona ? e.attributes.Zona : '--';
          NUPRE = e.attributes.NUPRE ? e.attributes.NUPRE : '--';
          FMI = e.attributes.FMI ? e.attributes.FMI : '--';
          Npredial = e.attributes['Número predial'] ? e.attributes['Número predial'] : '--';
          NpredialAnterior = e.attributes['Número predial anterior'] ? e.attributes['Número predial anterior'] : '--';
        });
        element.attributes.extdireccion.forEach(e => {
          // Direcciones
          // tslint:disable-next-line:no-string-literal
          País = e.attributes['País'] ? e.attributes['País'] : '--';
          Departamento = e.attributes.Departamento ? e.attributes.Departamento : '--';
          Ciudad = e.attributes.Ciudad ? e.attributes.Ciudad : '--';
          codigoPostal = e.attributes['Código postal'] ? e.attributes['Código postal'] : '--';
          Apartado_correo = e.attributes['Apartado correo'] ? e.attributes['Apartado correo'] : '--';
          Nombre_calle = e.attributes['Nombre calle'] ? e.attributes['Nombre calle'] : '--';
        });
      });
      const typeNumber = 4;
      const errorCorrectionLevel = 'L';
      const qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData('http://localhost:4200/#/consults/basic-parcel-info?fmi=' + FMI);
      qr.make();
      const text = 'SAT Consulta Basica';
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
      doc.text(text, this.xOffset(text) + 10, 50);
      // imagen QR
      doc.addImage(Imageqr, 340, 25);
      // MAPA
      doc.addImage(newImg, 'PNG', this.xOffset(newImg) - this.xOffset(text) + 50, 103, 200, 200);
      // horizantal mapa
      doc.line(10, 320, 426.46, 320);
      // Generacion de las tablas
      doc.text('Predio', 20, 335);
      doc.autoTable({
        margin: 20,
        startY: 340,
        tableWidth: 396.46,
        headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
        head: [['Tipo', 'Nombre', 'Departamento', 'Municipio', 'Zona', 'NUPRE', 'FMI', 'Número predial', 'Número predial anterior']],
        body: [
          [tipo, nombre, departamento, Municipio, Zona, NUPRE, FMI, Npredial, NpredialAnterior]
        ]
      });
      doc.text('Terreno', 20, 400);
      doc.autoTable({
        margin: 20,
        tableWidth: 396.46,
        headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
        head: [['Terreno']],
        body: [
          [terreno]
        ]
      });
      doc.text('Direcciones', 20, 450);
      doc.autoTable({
        margin: 20,
        tableWidth: 396.46,
        headStyles: { fillColor: [165, 174, 183] }, // Gris Oscuro
        head: [['País', 'Departamento', 'Ciudad', 'Código postal', 'Apartado correo', 'Nombre calle']],
        body: [
          [País, Departamento, Ciudad, codigoPostal, Apartado_correo, Nombre_calle]
        ]
      });
      doc.setFontSize(9);
      doc.text('Código de verificación: XXX-XXXXXX', 310, 25);
      doc.text('http://localhost:4200/#/consults/basic-parcel-info?fmi=' + FMI, 20, 609.4175);
      doc.save('ConsultaGeneral.pdf'); // Generated PDF
    }.bind(this);
    newImg.src = this.service.getTerrainGeometryImage(this.basicConsult[0].id);
  }
  public onKey(event: any) {
    if (event.key === 'Enter') {
      this.search();
    }
  }
}
