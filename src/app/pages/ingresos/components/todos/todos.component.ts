import { IngresosService } from 'src/app/core/services/ingresos/ingresos.service';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Iingreso } from 'src/app/core/services/models/ingreso.models';

interface GastoConColor extends Iingreso {
  color: string;
}
@Component({
  selector: 'app-todos-ingreso',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})


export class TodosIngresosComponent implements OnInit {

  suma:number= 0;
  ingresos:Iingreso[]=[];
  displayedColumns: string[] = [ 'descripcion', 'importe', 'fecha'];
 // data = ELEMENT_DATA;

 constructor(
  private datePipe: DatePipe,
  private ingresosService: IngresosService
 ){}

 ngOnInit(){
  this.getIngresos();
 }
 formatDate(date: Date): string {
  return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
}
sumaImportes(){
  let suma = 0;
  for (let i = 0; i < this.ingresos.length; i++) {
    suma += this.ingresos[i].importe;
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
};
resetSuma(){  
  this.suma = 0;  
}

// private getGastos(textoDigitado?: string) {
//   if (textoDigitado) {
//     this.gastosService.getGastos().pipe(
//       map(gastos => {
//         return gastos.filter(gasto => gasto.descripcion.toLowerCase().includes(textoDigitado.toLowerCase())
//         ||
//           gasto.tipo.toLowerCase().includes(textoDigitado.toLowerCase()))
//       })
//     ).subscribe(filteredCars => {
//       this.gastos = filteredCars;
//     });
//   } else {
//     this.gastosService.getGastos().subscribe(gasto => {
//       this.gastos = gasto;
//     });
//   }

// }


private getIngresos(textoDigitado?: string) {
  const currentMonth = new Date().getMonth(); // Obtener el mes actual (0-11)

  if (textoDigitado) {
    this.ingresosService.getIngreso().pipe(
      map(ingresos => {
        return ingresos.filter(ingreso =>
          ingreso.descripcion.toLowerCase().includes(textoDigitado.toLowerCase()) ||
          ingreso.tipo.toLowerCase().includes(textoDigitado.toLowerCase())
        ).map(ingreso => {
          const ingresoConColor: GastoConColor = { ...ingreso, color: '' };
          // Obtener el mes del gasto (0-11)
          const ingresoMonth = new Date(ingreso.fecha).getMonth();
          if (ingresoMonth > currentMonth) {
            ingresoConColor.color = 'red'; // Asignar un color para los meses futuros
          } else {
            ingresoConColor.color = 'blue'; // Asignar otro color para los meses pasados o iguales al presente
          }
          return ingresoConColor;
        });
      })
    ).subscribe(filteredGastos => {
      this.ingresos = filteredGastos;
    });
  } else {
    this.ingresosService.getIngreso().pipe(
      map(ingresos => {
        return ingresos.map(ingreso => {
          const ingresoConColor: GastoConColor = { ...ingreso, color: '' };
          // Obtener el mes del gasto (0-11)
          const gastoMonth = new Date(ingreso.fecha).getMonth();
          if (gastoMonth > currentMonth) {
            console.log('mayor mes gasto')
            ingresoConColor.color = 'red'; // Asignar un color para los meses futuros
          } else {
            ingresoConColor.color = 'blue'; // Asignar otro color para los meses pasados o iguales al presente
          }
          return ingresoConColor;
        });
      })
    ).subscribe(ingresos => {
      this.ingresos = ingresos;
    });
  }
}

capturarTexto(event: any) {
  let textoDigitado = event.target.value;
  this.getIngresos(textoDigitado);
}


}
