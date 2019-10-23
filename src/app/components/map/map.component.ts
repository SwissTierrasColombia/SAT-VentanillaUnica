import { Component, OnInit, SimpleChanges, OnChanges, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
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
import * as turf from '@turf/turf';

import { environment } from 'src/environments/environment';
import BaseLayer from 'ol/layer/Base';

export interface TLayer {
  layer: BaseLayer;
  title: string;
}

export class LayerList {
  layers: TLayer[] = [];
  list: BaseLayer[] = [];
  titles = [];
  add(title: string, layer: BaseLayer) {
    this.layers.push({ layer, title });
    this.list.push(layer);
    this.titles.push(title);
  }
  getLayers() {
    return this.list;
  }
  getLayerByTitle(title): BaseLayer {
    for (const tl of this.layers) {
      if (tl.title === title) {
        return tl.layer;
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {

  @Input() geom: string;
  @Input() baselayer: string;
  @Input() extralayers: any;

  @ViewChild('omap', { static: false }) omap: ElementRef;

  urlGeoserver: string = environment.geoserver;
  private legendVars = 'wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=LADM:';
  map: Map = null;
  view: View;
  layers: LayerList = new LayerList();
  projection = 'EPSG:3857';
  centroid = {
    geometry: { coordinates: [0, 0] }
  };
  srclegend = '';

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.baselayer && changes.baselayer.currentValue) {
      this.srclegend = this.urlGeoserver + this.legendVars + this.baselayer;
    }
    if (changes.geom && changes.geom.currentValue) {
      this.drawGeometry(this.geom);
    }

    if (changes.extralayers && changes.extralayers.currentValue) {
      for (const l of this.extralayers.versions) {
        const ol = this.getReferenceMap(l.layer);
        this.layers.add(l.name, ol);
        this.map.addLayer(ol);
      }
    }
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

    console.log(geom);


    this.initMap();

    this.centroid = turf.centroid(geom);

    const vs = new VectorSource({
      features: (new GeoJSON()).readFeatures(geom)
    });

    const vectorLayer = new VectorLayer({
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

    const polygon = vs.getFeatures()[0].getGeometry();
    this.view.fit(polygon.getExtent(), { size: [500, 500] });
    this.map.addLayer(vectorLayer);
  }

  getReferenceMap(name) {
    console.log(this.urlGeoserver);
    return new ImageLayer({
      source: new ImageWMS({
        ratio: 1,
        url: this.urlGeoserver + 'LADM/wms',
        params: {
          FORMAT: 'image/png',
          VERSION: '1.1.1',
          LAYERS: name,
          exceptions: 'application/vnd.ogc.se_inimage',
        }
      })
    });
  }

  initMap() {
    if (this.omap) {

      const reference = this.getReferenceMap('LADM:sat_mapa_base');

      this.layers.add('Google Satelite', this.getBaseMap('googleLayerSatellite', 1));
      this.layers.add('Google Road', this.getBaseMap('googleLayerOnlyRoad', 0.5));
      this.layers.add('Mapa de Referencia', reference);

      this.view = new View({
        projection: this.projection,
        center: [0, 0],
        zoom: 2
      });
      this.map = new Map({
        interactions: defaultInteractions({
          altShiftDragRotate: true,
          onFocusOnly: true,
          constrainResolution: true,
          doubleClickZoom: true,
          keyboard: true,
          mouseWheelZoom: true,
          shiftDragZoom: true,
          dragPan: true,
          pinchRotate: true,
          pinchZoom: true,
          zoomDelta: 1,
          zoomDuration: 1
        }),
        target: this.omap.nativeElement,
        layers: this.layers.getLayers(),
        view: this.view
      });
    }
  }

  toogleLayer(name: string, obj: any) {
    const l = this.layers.getLayerByTitle(name);
    l.setVisible(obj.target.checked);
  }

}
