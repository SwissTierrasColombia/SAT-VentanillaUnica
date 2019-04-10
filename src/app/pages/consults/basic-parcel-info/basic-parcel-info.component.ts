import { Component, OnInit } from '@angular/core';
import { BasicConsultService } from 'src/app/services/consult/basic-consult.service';
import { BasicConsult } from 'src/app/models/basic-parcel-info.interface';

import Map from 'ol/Map';
import View from 'ol/View';
import LayerTile from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { defaults as defaultInteractions } from 'ol/interaction.js';

declare var xepOnline: any;
declare var jQuery: any;

@Component({
  templateUrl: 'basic-parcel-info.component.html',
  styleUrls: ['./basic-parcel-info.component.scss']
})
export class BasicParcelInfoComponent implements OnInit {
  showResult = false;
  inputNupre: string;
  inputFMI = '167-15523';
  inputCadastralCode: string;
  basicConsult: BasicConsult;

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
          this.basicConsult = data;
          this.service.getParcelGeometry(this.basicConsult[0].id).subscribe(geom => {
            this.drawGeometry(geom);
          });
          this.showResult = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  public pdf() {
    xepOnline.Formatter.Format('Tables', { render: 'download', filename: 'ConsultaGeneral' });
  }

  public downloadPDF() {
    jQuery('div[id=card]').removeClass('Tables card');
    this.pdf();
    jQuery('div[id=card]').addClass('Tables card');
  }

  private drawGeometry(geom: any) {

    const vs = new VectorSource({
      features: (new GeoJSON()).readFeatures(geom)
    });

    const vl = new VectorLayer({
      source: vs,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.6)'
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

    const v = new View();
    const polygon = vs.getFeatures()[0].getGeometry();
    v.fit(polygon);

    const m = new Map({
      interactions: defaultInteractions({
        doubleClickZoom: false,
        dragAndDrop: false,
        dragPan: false,
        keyboardPan: false,
        keyboardZoom: false,
        mouseWheelZoom: false,
        pointer: false,
        select: false
      }),
      target: 'map' + this.basicConsult[0].id,
      layers: [
        new LayerTile({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        vl
      ],
      view: v
    });

    return m;

  }
}
