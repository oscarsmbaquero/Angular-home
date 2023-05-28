import { Component, OnInit, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

import { Subject } from 'rxjs';

import { GastosService } from 'src/app/core/services/gastos/gastos.service';
import { IngresosService } from 'src/app/core/services/ingresos/ingresos.service';
import {
  TypeGasto,
  TypeOfCar,
} from 'src/app/core/services/models/gastos.models';
import { IGasto } from 'src/app/core/services/models/gastos.models';
import { Iingreso } from 'src/app/core/services/models/ingreso.models';

@Component({
  selector: 'app-gst-ing',
  templateUrl: './gst-ing.component.html',
  styleUrls: ['./gst-ing.component.css'],
})
export class GstIngComponent implements OnInit {
  private gastosCompletados = new Subject<number>();
  private totalIngreso = new Subject<number>();
  private gastoMesPersonalTotal = new Subject<number>();
  private gastoMesMotoTotal = new Subject<number>();
  private gastoMesCasaTotal = new Subject<number>();
  private gastoMesSuaTotal = new Subject<number>();
  private gastoMesCocheTotal = new Subject<number>();
  private gastoMesOtroTotal = new Subject<number>();

  @Input() public title: string = 'Gastos e Ingresos';

  @Input('labels') barChartLabels: string[] = ['Gastos', 'Ingresos'];

  //@Input('labels2') batChartLabels2: string[] = ['Personal','Moto','Coche'];
  @Input('labels2') barChartLabels2: string[] = ['Personal', 'Moto', 'Casa','Sua','Coche','Otro'];

  @Input('data') barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0, 0],
      },
    ],
  };
  public barChartType: ChartType = 'bar';

  @Input('data2') barChartData2: ChartData<'bar'> = {
    labels: this.barChartLabels2,
    datasets: [
      {
        data: [0, 0, 0,0,0,0],
        backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)','rgba(0, 0, 255, 0.5)','rgba(0, 0, 255, 0.5)'],
      },
    ],
  };
  public barChartType2: ChartType = 'bar'; 
  /**
   *flag para guardar la suma de lo que pintaremos en la grafica
   */
  sumaG: number = 0;
  sumaIngreso: number = 0;
  sumaGastoMesPersonal: number = 0;
  sumaGastoMesMoto: number = 0;
  sumaGastoMesCasa: number = 0;
  sumaGastoMesSua: number = 0;
  sumaGastoMesCoche: number = 0;
  sumaGastoMesOtro: number = 0;
  
  /**
   *
   */
  gastos: IGasto[] = [];
  ingresos: Iingreso[] = [];

  gastoCasa: IGasto[] = [];
  gastoMoto: IGasto[] = [];
  gastoMesPersonal: IGasto[] = [];
  gastoMesMoto: IGasto[] = [];
  gastoMesSua: IGasto[] = [];
  gastoMesCasa: IGasto[] = [];
  gastoMesCoche: IGasto[] = [];
  gastoMesOtro: IGasto[] = [];
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
//  mesSeleccionado: any;

  constructor(
    private gastosService: GastosService,
    private ingresosService: IngresosService
  ) {}

  ngOnInit(): void {}
  /**
   * Total gasto casa
   */
  private getTotalGastosCasa() {
    this.gastosService.getGastosMes().subscribe((gastos) => {
      this.gastos = gastos;
      this.gastoCasa = this.gastos.filter((gasto) => gasto.tipo === 'casa');
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
      this.gastoMoto = this.gastos.filter((gasto) => gasto.tipo === 'moto');
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
      this.gastoCasa = this.gastos.filter((gasto) => gasto.tipo === 'casa');

      console.log(this.gastoCasa, 45);
      let suma = 0;
      for (let i = 0; i < this.gastoCasa.length; i++) {
        suma += this.gastoCasa[i].importe;
      }
      this.sumaG = suma;
    });
  }
  private getGastosMes() {
    this.gastosService.getGastosMes().subscribe((gastos) => {
      this.gastos = gastos;
      let suma = 0;
      for (let i = 0; i < this.gastos.length; i++) {
        suma += this.gastos[i].importe;
      }
      this.sumaG = suma;
      console.log(this.sumaG, 91);
      this.gastosCompletados.next(this.sumaG);
      this.updateChartData(this.sumaG, this.sumaIngreso);
    });
  }
  filterByMonth(event: any) {
    const month = event.value;
    this.selectedMonth = month;
    this.getIngresosMesSeleccionado(month);
    this.getGastosMesSeleccionado(month);
    this.getGastosMesSeleccionadoPersonal(month);
    this.getGastosMesSeleccionadoCasa(month);
    this.getGastosMesSeleccionadoMoto(month);
    this.getGastosMesSeleccionadoSua(month);
    this.getGastosMesSeleccionadoCoche(month);
  }
  private getIngresosMesSeleccionado(month: string) {
    this.ingresosService
      .getIngresosMesSeleccionado(month)
      .subscribe((ingresos) => {
        this.ingresos = ingresos;
        console.log(this.ingresos, 101);
        let suma = 0;
        for (let i = 0; i < this.ingresos.length; i++) {
          suma += this.ingresos[i].importe;
        }
        this.sumaIngreso = suma;
        this.totalIngreso.next(this.sumaIngreso);
        this.updateChartData(this.sumaG, this.sumaIngreso);
      });
  }
  private getGastosMesSeleccionado(month: string) {
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gastos) => {
      this.gastos = gastos;
      let suma = 0;
      for (let i = 0; i < this.gastos.length; i++) {
        suma += this.gastos[i].importe;
      }
      this.sumaG = suma;
      this.totalIngreso.next(this.sumaIngreso);
      this.updateChartData(this.sumaG, this.sumaIngreso);
    });
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
      console.log(this.sumaGastoMesPersonal, 'personal');
    });
  }
  getGastosMesSeleccionadoMoto(month: string) {
    console.log(month);
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
      console.log(this.sumaGastoMesMoto, 'moto');
    });
  }
  getGastosMesSeleccionadoCasa(month: string) {
    console.log(month);
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
    console.log(month);
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
    console.log(month);
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
    console.log(month);
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


  private updateChartData(sumaGastoMesPersonal: number, ingresos: number) {
    const newData = {
      labels: this.barChartLabels,
      datasets: [{ data: [sumaGastoMesPersonal, ingresos] }],
    };
    this.barChartData = newData;
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
      labels: this.barChartLabels2,
      datasets: [{ data: [sumaGastoMesPersonal, sumaGastoMesMoto,sumaGastoMesCasa,sumaGastoMesSua,sumaGastoMesCoche,sumaGastoMesOtro,] }],
    };
    this.barChartData2 = newData;
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
