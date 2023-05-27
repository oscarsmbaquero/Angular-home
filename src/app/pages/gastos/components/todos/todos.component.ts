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

private getGastos(textoDigitado?: string) {
  if (textoDigitado) {
    this.gastosService.getGastos().pipe(
      map(gastos => {
        return gastos.filter(gasto => gasto.descripcion.toLowerCase().includes(textoDigitado.toLowerCase())
        ||
          gasto.tipo.toLowerCase().includes(textoDigitado.toLowerCase()))
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


}
