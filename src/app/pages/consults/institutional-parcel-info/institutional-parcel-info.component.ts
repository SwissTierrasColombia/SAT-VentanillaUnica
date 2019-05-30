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
// import * as jspdf from 'jspdf';
// import html2canvas from 'html2canvas';

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

  constructor(private service: QueryService) { }

  ngOnInit() {
  }

  selectTypeSearch(id) {
    this.inputCadastralCode = '';
    this.inputFMI = '';
    this.inputNupre = '';
    this.tipoBusqueda = id;
  }

  search() {
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
                  this.physicalInfo = data[0];
                  this.basicData = basicData;
                  console.log('FÍSICA: ', this.physicalInfo, basicData);
                  this.service.getParcelGeometry(this.physicalInfo.attributes.predio[0].id).subscribe(geom => {
                    this.drawGeometry(geom);
                  });
                  this.showResult = true;
                });
          },
          error => {
            console.log(error);
            this.showResult = false;
          }
        );

      this.service
        .getParcelLegalQuery(this.inputFMI, this.inputCadastralCode, this.inputNupre)
        .subscribe(
          data => {
            this.legalInfo = data[0]['attributes']['predio'][0]['attributes'];
          },
          error => {
            console.log(error);
            this.showResult = false;
          }
        );
    } else {
      this.showResult = false;
    }
  }
  private getInteresadosInfo() {
    if (this.inputCadastralCode != '') {
      this.service.getInteresadosQuery('cadastralCode', this.inputCadastralCode).subscribe(
        data => {
          this.interesadosInfo = data;
        }
      );
    }
    if (this.inputFMI != '') {
      this.service.getInteresadosQuery('fmi', this.inputFMI).subscribe(
        data => {
          this.interesadosInfo = data;
          console.log(this.interesadosInfo);

        }
      );
    }
    if (this.inputNupre != '') {
      this.service.getInteresadosQuery('nupre', this.inputNupre).subscribe(
        data => {
          this.interesadosInfo = data;
        }
      );
    }
  }

  private drawGeometry(geom: any) {



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
      target: 'map',
      layers: [
        this.getBaseMap('googleLayerHybrid'),
        terreno,
        vl
      ],
      view: v
    });

    return m;

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
  public onKey(event: any) {
    if (event.key === "Enter") {
      this.search();
    }
  }

}
