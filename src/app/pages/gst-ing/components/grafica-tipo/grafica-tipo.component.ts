
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { Subject } from 'rxjs';
import { GastosService } from 'src/app/core/services/gastos/gastos.service';
import { TypeGasto} from 'src/app/core/services/models/gastos.models';
import { IGasto } from 'src/app/core/services/models/gastos.models';

@Component({
  selector: 'app-grafica-tipo',
  templateUrl: './grafica-tipo.component.html',
  styleUrls: ['./grafica-tipo.component.css']
})
export class GraficaTipoComponent {

  private gastoMesPersonalTotal = new Subject<number>();
  private gastoMesMotoTotal = new Subject<number>();
  private gastoMesCasaTotal = new Subject<number>();
  private gastoMesSuaTotal = new Subject<number>();
  private gastoMesCocheTotal = new Subject<number>();
  private gastoMesOtroTotal = new Subject<number>();

  @Input('labels') barChartLabels: string[] = ['Personal', 'Moto', 'Casa','Sua','Coche','Otro'];

  @Input() pruebaInput:string='';

  @Input('data') barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0, 0, 0,0,0,0],
        backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)','rgba(0, 0, 255, 0.5)','rgba(0, 0, 255, 0.5)'],
      },
    ],
  };
  public barChartType: ChartType = 'bar'; 

  constructor(
    private gastosService: GastosService,
  ){ }

  sumaGastoMesPersonal: number = 0;
  sumaGastoMesMoto: number = 0;
  sumaGastoMesCasa: number = 0;
  sumaGastoMesSua: number = 0;
  sumaGastoMesCoche: number = 0;
  sumaGastoMesOtro: number = 0;

  gastoCasa: IGasto[] = [];
  gastoMoto: IGasto[] = [];
  gastoMesPersonal: IGasto[] = [];
  gastoMesMoto: IGasto[] = [];
  gastoMesSua: IGasto[] = [];
  gastoMesCasa: IGasto[] = [];
  gastoMesCoche: IGasto[] = [];
  gastoMesOtro: IGasto[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pruebaInput'] && changes['pruebaInput'].currentValue) {
      this.showGrafics();
    }
  }
  showGrafics() {
    this.getGastosMesSeleccionadoPersonal(this.pruebaInput);
    this.getGastosMesSeleccionadoMoto(this.pruebaInput);
    this.getGastosMesSeleccionadoCasa(this.pruebaInput);
    this.getGastosMesSeleccionadoSua(this.pruebaInput);
    this.getGastosMesSeleccionadoCoche(this.pruebaInput);
    this.getGastosMesSeleccionadoOtro(this.pruebaInput);
  }

  getGastosMesSeleccionadoPersonal(month: string) {
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesPersonal = gasto.filter(
        (item) => item.tipo === TypeGasto.personal
      );
      let suma = 0;
      for (let i = 0; i < this.gastoMesPersonal.length; i++) {
        suma += this.gastoMesPersonal[i].importe;
      }
      this.sumaGastoMesPersonal = suma;
      this.gastoMesPersonalTotal.next(this.sumaGastoMesPersonal);
      this.updateChartDataTipo(
        this.sumaGastoMesPersonal,
        this.sumaGastoMesMoto,
        this.sumaGastoMesCasa,
        this.sumaGastoMesSua,
        this.sumaGastoMesCoche,
        this.sumaGastoMesOtro,
      );
    });
  }
  getGastosMesSeleccionadoMoto(month: string) {
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesMoto = gasto.filter((item) => item.tipo === TypeGasto.moto);
      let suma = 0;
      for (let i = 0; i < this.gastoMesMoto.length; i++) {
        suma += this.gastoMesMoto[i].importe;
      }
      this.sumaGastoMesMoto = suma;
      this.gastoMesMotoTotal.next(this.sumaGastoMesMoto);
      this.updateChartDataTipo(
        this.sumaGastoMesPersonal,
        this.sumaGastoMesMoto,
        this.sumaGastoMesCasa,
        this.sumaGastoMesSua,
        this.sumaGastoMesCoche,
        this.sumaGastoMesOtro,
      );
    });
  }
  getGastosMesSeleccionadoCasa(month: string) {
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesCasa = gasto.filter((item) => item.tipo === TypeGasto.casa);
      let suma = 0;
      for (let i = 0; i < this.gastoMesCasa.length; i++) {
        suma += this.gastoMesCasa[i].importe;
      }
      this.sumaGastoMesCasa = suma;
      this.gastoMesCasaTotal.next(this.sumaGastoMesCasa);
      this.updateChartDataTipo(
        this.sumaGastoMesPersonal,
        this.sumaGastoMesMoto,
        this.sumaGastoMesCasa,
        this.sumaGastoMesSua,
        this.sumaGastoMesCoche,
        this.sumaGastoMesOtro,
      );
    });
  }
  getGastosMesSeleccionadoSua(month: string) {
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesSua = gasto.filter((item) => item.tipo === TypeGasto.sua);
      let suma = 0;
      for (let i = 0; i < this.gastoMesSua.length; i++) {
        suma += this.gastoMesSua[i].importe;
      }
      this.sumaGastoMesSua = suma;
      this.gastoMesSuaTotal.next(this.sumaGastoMesSua);
      this.updateChartDataTipo(
        this.sumaGastoMesPersonal,
        this.sumaGastoMesMoto,
        this.sumaGastoMesCasa,
        this.sumaGastoMesSua,
        this.sumaGastoMesCoche,
        this.sumaGastoMesOtro,
      );
    });
  }
  getGastosMesSeleccionadoCoche(month: string) {
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesCoche = gasto.filter(
        (item) => item.tipo === TypeGasto.coche
      );
      let suma = 0;
      for (let i = 0; i < this.gastoMesCoche.length; i++) {
        suma += this.gastoMesCoche[i].importe;
      }
      this.sumaGastoMesCoche = suma;
      this.gastoMesCocheTotal.next(this.sumaGastoMesCoche);
      this.updateChartDataTipo(
        this.sumaGastoMesPersonal,
        this.sumaGastoMesMoto,
        this.sumaGastoMesCasa,
        this.sumaGastoMesSua,
        this.sumaGastoMesCoche,
        this.sumaGastoMesOtro,
      );
    });
  }
  getGastosMesSeleccionadoOtro(month: string) {
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesOtro = gasto.filter(
        (item) => item.tipo === TypeGasto.otro
      );
      let suma = 0;
      for (let i = 0; i < this.gastoMesOtro.length; i++) {
        suma += this.gastoMesOtro[i].importe;
      }
      this.sumaGastoMesOtro = suma;
      this.gastoMesOtroTotal.next(this.sumaGastoMesOtro);
      this.updateChartDataTipo(
        this.sumaGastoMesPersonal,
        this.sumaGastoMesMoto,
        this.sumaGastoMesCasa,
        this.sumaGastoMesSua,
        this.sumaGastoMesCoche,
        this.sumaGastoMesOtro,
      );
    });
  }

  private updateChartDataTipo(
    sumaGastoMesPersonal: number,
    sumaGastoMesMoto: number,
    sumaGastoMesCasa:number,
    sumaGastoMesSua:number,
    sumaGastoMesCoche:number,
    sumaGastoMesOtro:number,
  ) {
    const newData = {
      labels: this.barChartLabels,
      datasets: [{ data: [sumaGastoMesPersonal, sumaGastoMesMoto,sumaGastoMesCasa,sumaGastoMesSua,sumaGastoMesCoche,sumaGastoMesOtro,] }],
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
