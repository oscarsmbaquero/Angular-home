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
   /**
    * 
    */
   gastoCasa: IGasto[]=[]
  /**
   * 
   */
   gastoMoto: IGasto[]=[]


  constructor(
    private gastosService: GastosService,
    private ingresosService: IngresosService
  ){}

  ngOnInit(): void {
    this.getTotalGastosCasa();
    this.getTotalIngresos();
    this.getTotalGastos();
    this.getTotalGastosMoto();
    
  }
  /**
   * Total de gastos
   */
  private getTotalGastos() {
    this.gastosService.getGastos().subscribe((gastos) => {
      this.gastos = gastos;
      console.log(this.gastos,55)
      let suma = 0;
      for (let i = 0; i < this.gastos.length; i++) {
        suma += this.gastos[i].importe;
      }
    this.sumaG = suma;
    });
  }
  /**
   * Total gasto casa
   */
  private getTotalGastosCasa() {
    this.gastosService.getGastos().subscribe((gastos) => {
      this.gastos = gastos;
      this.gastoCasa = this.gastos.filter(gasto => gasto.tipo === 'casa');
      let suma = 0;
      for (let i = 0; i < this.gastoCasa.length; i++) {
        suma += this.gastoCasa[i].importe;
      }
    this.sumaG = suma;
    
    });
  }
  private getTotalGastosMoto() {
    this.gastosService.getGastos().subscribe((gastos) => {
      this.gastos = gastos;
      this.gastoMoto = this.gastos.filter(gasto => gasto.tipo === 'moto');
      let suma = 0;
      for (let i = 0; i < this.gastoMoto.length; i++) {
        suma += this.gastoMoto[i].importe;
      }
    this.sumaG = suma;
    
    });
  }
  private getTotalGastosPersonal() {
    this.gastosService.getGastos().subscribe((gastos) => {
      this.gastos = gastos;
      this.gastoCasa = this.gastos.filter(gasto => gasto.tipo === 'casa')

      console.log(this.gastoCasa,45)
      let suma = 0;
      for (let i = 0; i < this.gastoCasa.length; i++) {
        suma += this.gastoCasa[i].importe;
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
