
import { Component, Input, OnInit } from '@angular/core';
import { IGasto } from '../../../../core/models/gasto.models';

export interface PeriodicElement {
  descripcion: string;
  id: number;
  importe: number;
  fecha: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, descripcion: 'Hydrogen', importe: 1.0079, fecha: 'H' },
  { id: 2, descripcion: 'Helium', importe: 4.0026, fecha: 'He' },
  { id: 3, descripcion: 'Lithium', importe: 6.941, fecha: 'Li' },
  { id: 4, descripcion: 'Beryllium', importe: 9.0122, fecha: 'Be' },
  { id: 5, descripcion: 'Boron', importe: 10.811, fecha: 'B' },
  { id: 6, descripcion: 'Carbon', importe: 12.0107, fecha: 'C' },
  { id: 7, descripcion: 'Nitrogen', importe: 14.0067, fecha: 'N' },
  { id: 8, descripcion: 'Oxygen', importe: 15.9994, fecha: 'O' },
  { id: 9, descripcion: 'Fluorine', importe: 18.9984, fecha: 'F' },
  { id: 10, descripcion: 'Neon', importe: 20.1797, fecha: 'Ne' },
];

/**
 * 
 */

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css'],
})


export class MostrarComponent implements OnInit{

  @Input() gastos:IGasto[] = [];
  
  ngOnInit(): void {
    console.log(this.gastos, 41);
  }
  displayedColumns: string[] = ['id', 'descripcion', 'importe', 'fecha'];
  data = ELEMENT_DATA;
 
  
}
