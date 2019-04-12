import { Component, OnInit } from '@angular/core';
import { BasicConsultService } from 'src/app/services/consult/basic-consult.service';
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
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


//import { Map, TileLayer, CRS, geoJSON } from 'leaflet/dist/leaflet-src.esm.js';


// declare var xepOnline: any;
// declare var jQuery: any;
// declare var L: any;

@Component({
  templateUrl: 'basic-parcel-info.component.html',
  styleUrls: ['./basic-parcel-info.component.scss']
})
export class BasicParcelInfoComponent implements OnInit {
  showResult = false;
  inputNupre: string;
  inputFMI = '167-15523';
  inputCadastralCode: string;
  basicConsult: any;

  constructor(private service: BasicConsultService) { }

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
            console.log(this.basicConsult, "DATA", data);
            this.service.getParcelGeometry(this.basicConsult[0].id).subscribe(geom => {
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
      url: 'http://localhost:8080/geoserver/LADM/wms',
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
        this.getBaseMap('googleLayerHybrid'),
        terreno,
        vl
      ],
      view: v
    });

    return m;

  }

  public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options 216 x 279 tamaño carta
      const imgWidth = 200;
      const pageHeight = 270;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/jpeg');
      const position = 5;
      const pdf = new jspdf('A4');
      pdf.addImage(contentDataURL, 'JPEG', 1, position, imgWidth, imgHeight);
      pdf.save('ConsultaGeneral.pdf'); // Generated PDF
    });
  }
}
