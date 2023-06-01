import { GastosService } from './../../../../core/services/gastos/gastos.service';

import { Component, Input, OnInit } from '@angular/core';
import { IGasto } from '../../../../core/services/models/gastos.models';

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
    
    private datePipe: DatePipe,
    private gastosService: GastosService
    ) {  }
    
  displayedColumns: string[] = [ 'descripcion', 'importe', 'fecha','tipo','opciones'];
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

iconos: { [key: string]: string } = {
  moto: '/assets/iconos/moto.png',
  casa: '/assets/iconos/casa.png',
  personal: '/assets/iconos/personal.png',
  coche:'/assets/iconos/coche.png',
  sua:'/assets/iconos/sua.jpg',
  otro:'/assets/iconos/otro.png',
  eliminar:'/assets/iconos/borrar.jpg',
  // Agrega más tipos de gasto y sus iconos correspondientes
};



resetSuma(){  
  this.suma = 0;  
}

delete(id: string): void {
  console.log(id);
  const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este registro?');

  if (confirmation) {
    this.gastosService.deleteGasto(id).subscribe((response) => {
      console.log(response);
      window.location.reload(); // Refrescar la página actual      
    });
  }
  
  
}

}