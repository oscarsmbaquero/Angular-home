import { Component, EventEmitter, Input, Output,OnChanges,SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { GastosService } from 'src/app/core/services/gastos/gastos.service';
import { IngresosService } from 'src/app/core/services/ingresos/ingresos.service';
import { TypeGasto} from 'src/app/core/services/models/gastos.models';
import { IGasto } from 'src/app/core/services/models/gastos.models';
import { Iingreso } from 'src/app/core/services/models/ingreso.models';

@Component({
  selector: 'app-grafica-anio',
  templateUrl: './grafica-anio.component.html',
  styleUrls: ['./grafica-anio.component.css']
})
export class GraficaAnioComponent {

  @Input() public title: string = 'Gastos e Ingresos';

  @Input('labels') barChartLabels: string[] = ['T.Gastos', 'T.Ingresos'];

  @Input('data') barChartData: ChartData<'doughnut'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0, 0],
      },
    ],
  };
  public barChartType: ChartType = 'doughnut';
  //@Output() showGrafics = new EventEmitter<string>();

  @Input() pruebaInput:string='';
  //pruebaInput: string='';

  sumaGastoAnio: number = 0;
  ingresoAnio: number= 0;

  ingresosTotalAnio: Iingreso[] = [];
  gastosTotalAnio: IGasto[] = [];

  constructor(
    private gastosService: GastosService,
    private ingresosService: IngresosService
  ){ }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pruebaInput'] && changes['pruebaInput'].currentValue) {
      this.showGrafics();
    }
  }
  showGrafics() {
    this.getGastosAnual();
    this.getIngresosAnual();
  }

  private getGastosAnual(){
    this.gastosService.getGastos().subscribe((gastos) => {
      this.gastosTotalAnio = gastos;
      let suma = 0;
      for (let i = 0; i < this.gastosTotalAnio.length; i++) {
        suma += this.gastosTotalAnio[i].importe;
      }
      this.sumaGastoAnio = suma;
      console.log(this.sumaGastoAnio, 91);
      //this.totalsumaGastoAnio.next(this.sumaGastoAnio);
      this.updateChartAnio(this.sumaGastoAnio, this.ingresoAnio);
    });
  }
  private getIngresosAnual(){
    this.ingresosService.getIngreso().subscribe((gastos) => {
      this.ingresosTotalAnio = gastos;
      let suma = 0;
      for (let i = 0; i < this.ingresosTotalAnio.length; i++) {
        suma += this.ingresosTotalAnio[i].importe;
      }
      this.ingresoAnio = suma;
      console.log(this.ingresoAnio, 348);
      //this.totalIngresoAnio.next(this.ingresoAnio);
      this.updateChartAnio(this.sumaGastoAnio, this.ingresoAnio);
    });
  }
  private updateChartAnio(sumaGastoAnio: number, ingresoAnio: number) {
    console.log('Gola',sumaGastoAnio,ingresoAnio);
    
    const newData = {
      labels: this.barChartLabels,
      datasets: [{ data: [sumaGastoAnio, ingresoAnio] }],
    };
    console.log(newData,'newData')
    this.barChartData = newData;
  }
  public barChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    datasets: {
      bar: {
        backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)','rgba(220, 20, 102, 0.5)','rgba(115,110,5,1)','rgba(250, 0, 255, 0.5)'],
      },
    },
  };

}

