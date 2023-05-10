import { Component,OnInit,Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType} from 'chart.js';

import { Subject } from 'rxjs';

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

private gastosCompletados = new Subject<number>();
private totalIngreso = new Subject<number>();


@Input() public title: string =  'Sin titulo' ;

@Input('labels') barChartLabels: string[] = ['Gastos', 'Ingresos'];

// @Input('data') barChartData: ChartData<'bar'>  = {
//       labels: this.barChartLabels,
//       datasets: [
//         { data: [ 0, 0 ] },
        
       
//       ]
//     };
@Input('data') barChartData: ChartData<'bar'>  = {
  labels: this.barChartLabels,
  datasets: [
    {
      data: [ 0, 0 ],
      
    }
  ]
};

  public barChartType: ChartType = 'bar';
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
   /**
    * opciones el input select
    */
   months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Dicember'];

   selectedMonth: any;
   mesSeleccionado: any;
  constructor(
    private gastosService: GastosService,
    private ingresosService: IngresosService
  ){}

  ngOnInit(): void {
    //this.getTotalGastosCasa();
    //this.getIngresosMes();
    //this.getGastosMes();
    //this.getTotalGastosMoto();
    
  }
 
  /**
   * Total gasto casa
   */
  private getTotalGastosCasa() {
    this.gastosService.getGastosMes().subscribe((gastos) => {
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
    return this.sumaG;
    
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
 
  private updateChartData(gastos: number, ingresos: number) {
    const newData = {
      labels: this.barChartLabels,
      datasets: [
        { data: [gastos, ingresos] }
      ]
    };
    this.barChartData = newData;
  }
  
  private getGastosMes() {
    this.gastosService.getGastosMes().subscribe((gastos) => {
      this.gastos = gastos;
      let suma = 0;
      for (let i = 0; i < this.gastos.length; i++) {
        suma += this.gastos[i].importe;
      }
      this.sumaG = suma;
      console.log(this.sumaG,91)
      this.gastosCompletados.next(this.sumaG);
      this.updateChartData(this.sumaG, this.sumaIngreso);
    });
  }
  // private getIngresosMes() {
  //   this.ingresosService.getIngresosMes().subscribe((ingreso) => {
  //     this.ingresos = ingreso;
  //     let suma = 0;
  //     for (let i = 0; i < this.ingresos.length; i++) {
  //       suma += this.ingresos[i].importe;
  //     }
  //     this.sumaIngreso = suma;
  //     console.log(this.sumaIngreso,91)
  //     this.totalIngreso.next(this.sumaIngreso);
  //     this.updateChartData(this.sumaG, this.sumaIngreso);
  //   });
  // }
  filterByMonth(event: any) {    
    const month = event.value;
    this.selectedMonth = month;
    this.getIngresosMesSeleccionado(month);
    this.getGastosMesSeleccionado(month);
  }
  
  private getIngresosMesSeleccionado(month:string) {
    this.ingresosService.getIngresosMesSeleccionado(month).subscribe((ingresos) => {
      this.ingresos = ingresos;
      console.log(this.ingresos, 101)
      let suma = 0;
      for (let i = 0; i < this.ingresos.length; i++) {
        suma += this.ingresos[i].importe;
      }
      this.sumaIngreso = suma;
      this.totalIngreso.next(this.sumaIngreso);
      this.updateChartData(this.sumaG, this.sumaIngreso);
    });
  }
  
  private getGastosMesSeleccionado(month:string) {
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gastos) => {
      this.gastos = gastos;
      console.log(this.gastos, 182)
      let suma = 0;
      for (let i = 0; i < this.gastos.length; i++) {
        suma += this.gastos[i].importe;
      }
      this.sumaG = suma;
      this.totalIngreso.next(this.sumaIngreso);
      this.updateChartData(this.sumaG, this.sumaIngreso);
    });
  }
  // filterByMonth(event: any) {    
  //   const month = event.value;
  //   this.selectedMonth = month;
  //   this.getIngresosMesSeleccionado(month);
  // }
  

}
