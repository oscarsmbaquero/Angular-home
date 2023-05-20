import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IGasto } from 'src/app/core/services/models/gastos.models';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})


export class TodosComponent {

  suma:number= 0;
  @Input() gastos:IGasto[] = [];
  displayedColumns: string[] = [ 'descripcion', 'importe', 'fecha','tipo'];
 // data = ELEMENT_DATA;

 constructor(
  private datePipe: DatePipe
 ){

 }
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
  // Agrega más tipos de gasto y sus iconos correspondientes
};



resetSuma(){  
  this.suma = 0;  
}
}
