import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GastosService } from 'src/app/core/services/gastos/gastos.service';
import { IGasto } from 'src/app/core/services/models/gastos.models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})


export class TodosComponent implements OnInit {

  suma:number= 0;
 // @Input() gastos:IGasto[] = [];
  //gastosFiltrados:IGasto[]=this.gastos;
  gastos:IGasto[]=[];
  displayedColumns: string[] = [ 'descripcion', 'importe', 'fecha','tipo'];
 // data = ELEMENT_DATA;

 constructor(
  private datePipe: DatePipe,
  private gastosService: GastosService
 ){}

 ngOnInit(){
  this.getGastos();
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
// private getGastos() {
//   this.gastosService.getGastos().subscribe((gastos) => {
//     this.gastos = gastos;
//     console.log(this.gastos,18);
    
//   });
// }
private getGastos(textoDigitado?: string) {
  if (textoDigitado) {
    this.gastosService.getGastos().pipe(
      map(cars => {
        return cars.filter(gasto => gasto.descripcion.toLowerCase().includes(textoDigitado.toLowerCase()))
      })
    ).subscribe(filteredCars => {
      this.gastos = filteredCars;
    });
  } else {
    this.gastosService.getGastos().subscribe(gasto => {
      this.gastos = gasto;
    });
  }
}
capturarTexto(event: any) {
  let textoDigitado = event.target.value;
  this.getGastos(textoDigitado);
}

// capturarTexto(event: any) {
//   let gastoFiltrado;
 
//   let textoDigitado = event.target.value;
//   console.log(textoDigitado,'texto')
//   if(textoDigitado){
//     gastoFiltrado = this.gastos.filter(car => car.descripcion.toLowerCase().includes(textoDigitado.toLowerCase()))
//   }else{
//     gastoFiltrado = this.gastos
//     debugger;
//   }
//   this.gastosFiltrados = gastoFiltrado
// }
}
