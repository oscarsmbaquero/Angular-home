import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { Subject } from 'rxjs';
import { GastosService } from 'src/app/core/services/gastos/gastos.service';
import { IngresosService } from 'src/app/core/services/ingresos/ingresos.service';
import { TypeGasto} from 'src/app/core/services/models/gastos.models';
import { IGasto } from 'src/app/core/services/models/gastos.models';
import { Iingreso } from 'src/app/core/services/models/ingreso.models';

@Component({
  selector: 'app-gst-ing',
  templateUrl: './gst-ing.component.html',
  styleUrls: ['./gst-ing.component.css'],
})
export class GstIngComponent implements OnInit {

  // private totalIngresoAnio = new Subject<number>();
  // private totalsumaGastoAnio = new Subject<number>();

  @Input() public title: string = 'Gastos e Ingresos';

  // @Input('labels') barChartLabels: string[] = ['T.Gastos', 'T.Ingresos'];


  // @Input('data3') barChartData: ChartData<'bar'> = {
  //   labels: this.barChartLabels,
  //   datasets: [
  //     {
  //       data: [0, 0],
  //     },
  //   ],
  // };
  // public barChartType: ChartType = 'bar';
  /**
   *flag para guardar la suma de lo que pintaremos en la grafica
  */
  // sumaGastoAnio: number = 0;
  // ingresoAnio: number= 0;
  
  // gastos: IGasto[] = [];
  // ingresos: Iingreso[] = [];
  // ingresosTotalAnio: Iingreso[] = [];
  // gastosTotalAnio: IGasto[] = [];

  @Output() showGrafics = new EventEmitter<string>();
  pruebaInput: string='';
  /**
   * opciones el input select
  */
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Dicember',
  ];
  selectedMonth: any;



  constructor(
    // private gastosService: GastosService,
    // private ingresosService: IngresosService
  ) {}

  ngOnInit(): void {}
 
  filterByMonth(event: any) {
    const month = event.value;
    this.selectedMonth = month;
    // this.getGastosAnual();
    // this.getIngresosAnual();
  }
 
  // private getGastosAnual(){
  //   this.gastosService.getGastos().subscribe((gastos) => {
  //     this.gastosTotalAnio = gastos;
  //     let suma = 0;
  //     for (let i = 0; i < this.gastosTotalAnio.length; i++) {
  //       suma += this.gastosTotalAnio[i].importe;
  //     }
  //     this.sumaGastoAnio = suma;
  //     console.log(this.sumaGastoAnio, 91);
  //     this.totalsumaGastoAnio.next(this.sumaGastoAnio);
  //     this.updateChartAnio(this.sumaGastoAnio, this.ingresoAnio);
  //   });
  // }
  // private getIngresosAnual(){
  //   this.ingresosService.getIngreso().subscribe((gastos) => {
  //     this.ingresosTotalAnio = gastos;
  //     let suma = 0;
  //     for (let i = 0; i < this.ingresosTotalAnio.length; i++) {
  //       suma += this.ingresosTotalAnio[i].importe;
  //     }
  //     this.ingresoAnio = suma;
  //     console.log(this.ingresoAnio, 348);
  //     this.totalIngresoAnio.next(this.ingresoAnio);
  //     this.updateChartAnio(this.sumaGastoAnio, this.ingresoAnio);
  //   });
  // }
  // private updateChartAnio(sumaGastoAnio: number, ingresoAnio: number) {
  //   const newData = {
  //     labels: this.barChartLabels,
  //     datasets: [{ data: [sumaGastoAnio, ingresoAnio] }],
  //   };
  //   this.barChartData = newData;
  // }
  // public barChartOptions: any = {
  //   responsive: true,
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  //   datasets: {
  //     bar: {
  //       backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)','rgba(220, 20, 102, 0.5)','rgba(115,110,5,1)','rgba(250, 0, 255, 0.5)'],
  //     },
  //   },
  // };
  showGraficas(event:any){
    this.pruebaInput = event.value;
    console.log(this.pruebaInput,402);
    // this.showGrafics.emit(event)
  }
}
