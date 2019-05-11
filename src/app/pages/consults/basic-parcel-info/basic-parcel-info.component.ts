import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/services/consult/query.service';
// import { BasicConsult } from 'src/app/models/basic-parcel-info.interface';


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
import { UserOptions } from 'jspdf-autotable';
import { discardPeriodicTasks } from '@angular/core/testing';
//import { Map, TileLayer, CRS, geoJSON } from 'leaflet/dist/leaflet-src.esm.js';


// declare var xepOnline: any;
// declare var jQuery: any;
// declare var L: any;

@Component({
  selector: 'app-basic-parcel-info',
  templateUrl: 'basic-parcel-info.component.html',
  styleUrls: ['./basic-parcel-info.component.scss']
})
export class BasicParcelInfoComponent implements OnInit {
  showResult = false;
  inputNupre: string;
  inputFMI = '167-15523';
  inputCadastralCode: string;
  basicConsult: any;
  image: any;
  urlGeoserver: string = environment.geoserver;
  constructor(private service: QueryService) { }

  ngOnInit() {

  }

  search() {
    if (this.inputNupre || this.inputCadastralCode || this.inputFMI) {
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

          if (data['error']) {
            console.log(data['error']);
            this.showResult = false;
          } else {
            this.basicConsult = [data[0]];
            console.log('Consulta basica: ', this.basicConsult, " DATA: ", data);
            this.service.getTerrainGeometry(this.basicConsult[0].id).subscribe(geom => {
              this.drawGeometry(geom);
            });
            this.showResult = true;
          }
        },
        error => {
          console.log(error);
          this.showResult = false;
        }
      );
  }

  private getBaseMap(type: string) {
    let source = '';
    switch (type) {
      case 'googleLayerRoadNames': source = 'http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}'; break;
      case 'googleLayerRoadmap': source = 'http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}'; break;
      case 'googleLayerSatellite': source = 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}'; break;
      case 'googleLayerHybrid': source = 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'; break;
      case 'googleLayerTerrain': source = 'http://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}'; break;
      case 'googleLayerHybrid2': source = 'http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'; break;
      case 'googleLayerOnlyRoad': source = 'http://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'; break;
      case 'OSM': source = 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'; break;
    }
    if (source !== '') {
      return new LayerTile({
        title: type,
        source: new XYZ({
          url: source
        })
      });
    } else {
      return null;
    }
  }

  private drawGeometry(geom: any) {

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

    const vs = new VectorSource({
      features: (new GeoJSON()).readFeatures(geom)
    });

    const sterreno = new TileWMS({
      url: this.urlGeoserver + 'LADM/wms',
      params: { LAYERS: 'LADM:vista_terreno', TILED: true },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });

    const terreno = new LayerTile({
      title: 'Terreno',
      source: sterreno,
      opacity: 0.5
    });


    const vl = new VectorLayer({
      source: vs,
      style: new Style({
        fill: new Fill({
          color: 'rgba(100, 255, 100, 0.6)'
        }),
        stroke: new Stroke({
          color: '#319FD3',
          width: 1
        }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.6)'
          }),
          stroke: new Stroke({
            color: '#319FD3',
            width: 1
          })
        })
      })
    });

    const v = new View({ projection: 'EPSG:900913' });
    const polygon = vs.getFeatures()[0].getGeometry();
    v.fit(polygon, { size: [500, 500] });
    var m = new Map({
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
        this.getBaseMap('googleLayerHybrid'),
        terreno,
        vl
      ],
      view: v
    });

    return m;

  }

  public captureScreen() {
    var newImg = new Image;
    newImg.onload = function() {
        console.log(this);
        var tipo = ''
        var nombre = ''
        var departamento = ''
        var Municipio = ''
        var Zona = ''
        var NUPRE = ''
        var FMI = ''
        var Npredial = ''
        var NpredialAnterior = ''
        var terreno = ''
        var País = ''
        var Departamento = ''
        var Ciudad = ''
        var Código_postal = ''
        var Apartado_correo = ''
        var Nombre_calle = ''
    
        this.basicConsult.forEach(element => {
          //Terreno
          terreno = element.attributes['Área de terreno [m2]']
          element.attributes.predio.forEach(element => {
            //Predio
            tipo = element.attributes["Tipo"]
            nombre = element.attributes["Nombre"]
            departamento = element.attributes["Departamento"]
            Municipio = element.attributes["Municipio"]
            Zona = element.attributes["Zona"]
            NUPRE = element.attributes["NUPRE"]
            FMI = element.attributes["FMI"]
            Npredial = element.attributes["Número predial"]
            NpredialAnterior = element.attributes["Número predial anterior"]
          });
          element.attributes.extdireccion.forEach(element => {
            //Direcciones
            País = element.attributes["País"]
            Departamento = element.attributes["Departamento"]
            Ciudad = element.attributes["Ciudad"]
            Código_postal = element.attributes["Código postal"]
            Apartado_correo = element.attributes["Apartado correo"]
            Nombre_calle = element.attributes["Nombre calle"]
          });
        })
        // Few necessary setting options 216 x 279 tamaño carta
        const doc = new jspdf('portrait', 'px', 'a4');
        doc.addImage(newImg, 'PNG', 30, 30, 300, 200);
        doc.autoTable({ html: '.contentToConvert' });
        // From Javascript
        let finalY = doc.previousAutoTable.finalY;
        doc.text("Predio", 30, finalY + 10);
        doc.autoTable({
          head: [['Tipo', 'Nombre', 'Departamento', 'Municipio', 'Zona', 'NUPRE', 'FMI', 'Número predial', 'Número predial anterior']],
          body: [
            [tipo, nombre, departamento, Municipio, Zona, NUPRE, FMI, Npredial, NpredialAnterior]
          ]
        });
        doc.text("Terreno", 30, finalY + 85);
        doc.autoTable({
          head: [['Terreno']],
          body: [
            [terreno]
          ]
        });
        doc.text("Direcciones", 30, finalY + 132);
        doc.autoTable({
          head: [['País', 'Departamento', 'Ciudad', 'Código postal', 'Apartado correo', 'Nombre calle']],
          body: [
            [País, Departamento, Ciudad, Código_postal, Apartado_correo, Nombre_calle]
          ]
        }); 
        doc.save('ConsultaGeneral.pdf'); // Generated PDF
    }.bind(this);
    newImg.src = this.service.getTerrainGeometryImage(this.basicConsult[0].id);
    
  }

}
