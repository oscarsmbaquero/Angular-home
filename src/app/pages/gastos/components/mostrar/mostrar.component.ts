
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

  /**
   * recibo los gastos desde el componente padre
   */
  @Input() gastos:IGasto[] = [];
  
  ngOnInit(): void {
    // console.log(this.gastos, 41);
  }
  constructor(
    
    private datePipe: DatePipe
    ) {
    
  }
  displayedColumns: string[] = [ 'descripcion', 'importe', 'fecha'];
 // data = ELEMENT_DATA;
 formatDate(date: Date): string {
  return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
}
  
}
