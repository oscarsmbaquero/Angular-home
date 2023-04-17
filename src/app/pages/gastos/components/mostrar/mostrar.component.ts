
import { Component, Input, OnInit } from '@angular/core';
import { IGasto } from '../../../../core/services/models/gastos.models';
import { GastosService } from '../../../../core/services/gastos/gastos.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css'],
})

export class MostrarComponent implements OnInit{
 suma:number = 0;
  /**
   * recibo los gastos desde el componente padre
   */
  @Input() gastos:IGasto[] = [];
  
  
  ngOnInit(): void {
    this.sumaImportes()
  }
  constructor(
    
    private datePipe: DatePipe
    ) {  }
    
  displayedColumns: string[] = [ 'descripcion', 'importe', 'fecha','tipo'];
 // data = ELEMENT_DATA;
 formatDate(date: Date): string {
  return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
}
sumaImportes(){
  let suma = 0;
  for (let i = 0; i < this.gastos.length; i++) {
    suma += this.gastos[i].importe;
    console.log(suma,41)
  }
this.suma = suma;
  
}
}