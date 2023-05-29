import { Subject } from 'rxjs';
import { Component,Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { IGasto } from 'src/app/core/services/models/gastos.models';
import { Iingreso } from 'src/app/core/services/models/ingreso.models';
import { IngresosService } from 'src/app/core/services/ingresos/ingresos.service';
import { GastosService } from 'src/app/core/services/gastos/gastos.service';
import { months } from 'moment';

@Component({
  selector: 'app-grafica-mes',
  templateUrl: './grafica-mes.component.html',
  styleUrls: ['./grafica-mes.component.css']
})


export class GraficaMesComponent implements OnChanges{
  
  private totalGastoMes = new Subject<number>();
  private totalIngresoMes = new Subject<number>();

  @Input('labels') barChartLabels: string[] = ['Gastos', 'Ingresos'];
  
  @Input() pruebaInput:string='';

  @Input('data') barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0, 0],
      },
    ],
  };

  constructor(
    private gastosService: GastosService,
    private ingresosService: IngresosService
  ){

  }

  public barChartType: ChartType = 'bar';
  sumaGastos: number = 0;
  sumaIngreso: number = 0;
  gastos: IGasto[] = [];
  ingresos: Iingreso[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pruebaInput'] && changes['pruebaInput'].currentValue) {
      this.showGrafics();
    }
  }
  showGrafics() {
    this.getIngresosMesSeleccionado(this.pruebaInput);
    this.getGastosMesSeleccionado(this.pruebaInput);
  }

  ngOnInit(){
    // console.log(this.pruebaInput,14)
  }

  private getIngresosMesSeleccionado(month: string) {
    this.ingresosService
      .getIngresosMesSeleccionado(month)
      .subscribe((ingresos) => {
        this.ingresos = ingresos;
        let suma = 0;
        for (let i = 0; i < this.ingresos.length; i++) {
          suma += this.ingresos[i].importe;
        }
        this.sumaIngreso = suma;
        this.totalIngresoMes.next(this.sumaIngreso);
        this.updateChartData(this.sumaGastos, this.sumaIngreso);
      });
  }
  private getGastosMesSeleccionado(month: string) {
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gastos) => {
      this.gastos = gastos;
      let suma = 0;
      for (let i = 0; i < this.gastos.length; i++) {
        suma += this.gastos[i].importe;
      }
      this.sumaGastos = suma;
      this.totalGastoMes.next(this.sumaIngreso);
      this.updateChartData(this.sumaGastos, this.sumaIngreso);
    });
  }

  private updateChartData(gastos: number, ingresos: number) {
    const newData = {
      labels: this.barChartLabels,
      datasets: [{ data: [gastos, ingresos] }],
    };
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
