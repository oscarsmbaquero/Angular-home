import { Component,OnInit } from '@angular/core';

import { GastosService } from 'src/app/core/services/gastos/gastos.service';
import { IngresosService } from 'src/app/core/services/ingresos/ingresos.service';
import { IGasto } from 'src/app/core/services/models/gastos.models';
import { Iingreso } from 'src/app/core/services/models/ingreso.models';

@Component({
  selector: 'app-gst-ing',
  templateUrl: './gst-ing.component.html',
  styleUrls: ['./gst-ing.component.css']
})
export class GstIngComponent implements OnInit{
  /**
   *Almacenamos los gastos en un array vacio
    */
  gastos: IGasto[]=[]
  /**
   * 
   * Almacenamos los ingresos en un array vacio  
   */
  ingresos:Iingreso[]=[]
  /**
   *flag para guardar la suma  
   */ 
    sumaG:number=0 ;
    /**
   *flag para guardar la suma  
   */ 
   sumaIngreso:number=0 ;
  constructor(
    private gastosService: GastosService,
    private ingresosService: IngresosService
  ){}

  ngOnInit(): void {
    this.getTotalGastos();
    this.getTotalIngresos();
    
  }

  private getTotalGastos() {
    this.gastosService.getGastos().subscribe((gastos) => {
      this.gastos = gastos;
      let suma = 0;
      for (let i = 0; i < this.gastos.length; i++) {
        suma += this.gastos[i].importe;
      }
    this.sumaG = suma;
    });
  }
  private getTotalIngresos() {
    this.ingresosService.getIngreso().subscribe((ingresos) => {
      this.ingresos = ingresos;
      let suma = 0;
      for (let i = 0; i < this.ingresos.length; i++) {
        suma += this.ingresos[i].importe;
      }
    this.sumaIngreso = suma;
    });
  }
  
  

}
