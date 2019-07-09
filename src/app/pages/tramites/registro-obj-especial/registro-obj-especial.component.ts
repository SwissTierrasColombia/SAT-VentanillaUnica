import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

export interface UsersData {
  id: number;
  modelo: string;
  objeto: string;
  restricciones: string;
  urlws: string;
  fechas: string;
}

const ELEMENT_DATA: UsersData[] = [
];

@Component({
  selector: 'app-registro-obj-especial',
  templateUrl: './registro-obj-especial.component.html',
  styleUrls: ['./registro-obj-especial.component.scss']
})
export class RegistroObjEspecialComponent implements OnInit {
  displayedColumns: string[] = ['id', 'modelo', 'objeto', 'restricciones', 'urlws', 'fechas', 'modificar'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, {}) table: MatTable<any>;

  constructor(public dialog: MatDialog) { }

  openDialog(modificar: any, obj: { modificar: any; }) {
    obj.modificar = modificar;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: { modelo: string; objeto: string; restricciones: string; urlws: string; fechas: string }) {
    var d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      modelo: row_obj.modelo,
      objeto: row_obj.objeto,
      restricciones: row_obj.restricciones,
      urlws: row_obj.urlws,
      fechas: row_obj.fechas,
    });
    this.table.renderRows();

  }
  updateRowData(row_obj: { id: number; modelo: string; objeto: string; restricciones: string; urlws: string; fechas: string; modificar: string; }) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.modelo = row_obj.modelo;
        value.objeto = row_obj.objeto;
        value.restricciones = row_obj.restricciones;
        value.urlws = row_obj.urlws;
        value.fechas = row_obj.fechas;
      }
      return true;
    });
  }
  deleteRowData(row_obj: { id: number; }) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }

  ngOnInit() {
  }

}
