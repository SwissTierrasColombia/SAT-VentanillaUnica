import { Component, OnInit } from '@angular/core';

// Oper Layers
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

// Enviroment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-open-layer',
  templateUrl: './map-open-layer.component.html',
  styleUrls: ['./map-open-layer.component.scss']
})
export class MapOpenLayerComponent implements OnInit {

  public geom: any;

  public centroid: any;

  public urlGeoserver: string = environment.geoserver;

  constructor() {
    // canutalito
    // this.geom = {
    //   type: 'MultiPolygon',
    //   coordinates: [
    //     [
    //       [
    //         [-8353361.2261945, 1062031.17963074],
    //         [-8353370.25847848, 1062025.65863235],
    //         [-8353378.48529781, 1062055.96427221],
    //         [-8353378.88591233, 1062059.65117789],
    //         [-8353379.2190202, 1062059.62045565],
    //         [-8353379.65090234, 1062064.355238],
    //         [-8353364.20572917, 1062065.78298169],
    //         [-8353361.2261945, 1062031.17963074]
    //       ]
    //     ]
    //   ]
    // };

    this.geom = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [
              -8369554.37863635,
              1064856.44464256
            ],
            [
              -8369540.16393142,
              1064865.71519651
            ],
            [
              -8369546.42922943,
              1064875.74906734
            ],
            [
              -8369538.49870828,
              1064879.26977216
            ],
            [
              -8369535.45673019,
              1064880.17103499
            ],
            [
              -8369524.41069363,
              1064885.25013299
            ],
            [
              -8369514.22275492,
              1064864.25500375
            ],
            [
              -8369543.74174184,
              1064841.19845891
            ],
            [
              -8369554.37863635,
              1064856.44464256
            ]
          ]
        ]
      ]
    };

    this.centroid = {
      geometry: { coordinates: [0, 0] }
    };

  }

  ngOnInit() {
    this.drawGeometry(this.geom);
  }

  private drawGeometry(geom: any) {


    this.centroid = turf.centroid(geom);

    const vs = new VectorSource({
      features: (new GeoJSON()).readFeatures(geom)
    });

    const sterreno = new ImageLayer({
      source: new ImageWMS({
        ratio: 1,
        url: this.urlGeoserver + 'LADM/wms',
        params: {
          FORMAT: 'image/png',
          VERSION: '1.1.1',
          LAYERS: 'LADM:ovejas_p2',
          exceptions: 'application/vnd.ogc.se_inimage',
        }
      })
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
        mouseWheelZoom: true,
        pointer: true,
        select: true
      }),
      target: 'map' + 8408,
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

}
