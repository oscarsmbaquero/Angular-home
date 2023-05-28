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



  @Input() public title: string = 'Gastos e Ingresos';

  @Input('labels') barChartLabels: string[] = ['Gastos', 'Ingresos'];

  @Input('labels') batChartLabel2: string[] = ['Personal','Moto','Coche']

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
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0,0],
      },
    ],
  };
  public barChartType2: ChartType = 'bar';
    /**
   *Almacenamos los gastos en un array vacio
   */
  gastos: IGasto[] = [];
  /**
   * Almacenamos los ingresos en un array vacio
   */
  ingresos: Iingreso[] = [];
  /**
   *flag para guardar la suma
   */
  sumaG: number = 0;
  /**
   *flag para guardar la suma
   */
  sumaIngreso: number = 0;
  /**
   * suma de gasto Personal
   */
  sumaGastoMesPersonal: number =0;
  /**
   *
   */
  gastoCasa: IGasto[] = [];
  /**
   *
   */
  gastoMoto: IGasto[] = [];
  /**
   *
   */
  gastoMesPersonal: IGasto[] = [];
  /**
   *
   */
  gastoMesMoto: IGasto[] = [];
  /**
   * 
   */
  gastoMesSua: IGasto[]=[];
/**
 * 
 */
  gastoMesCasa : IGasto[]=[];

  gastoMesCoche : IGasto[]=[];
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
  mesSeleccionado: any;
  constructor(
    private gastosService: GastosService,
    private ingresosService: IngresosService
  ) {}

  ngOnInit(): void {
  }
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
    console.log(month);
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesPersonal = gasto.filter(
        (item) => item.tipo === TypeGasto.personal
      );
      let suma = 0;
      for (let i = 0; i < this.gastoMesPersonal.length; i++) {
        suma += this.gastos[i].importe;
      }
      this.sumaGastoMesPersonal = suma;
      this.gastoMesPersonalTotal.next(this.sumaGastoMesPersonal);
      this.updateChartDataTipo( this.sumaGastoMesPersonal,);
      console.log(this.sumaGastoMesPersonal, 'personal');
    });
  }
  getGastosMesSeleccionadoMoto(month: string) {
    console.log(month);
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesMoto = gasto.filter(
        (item) => item.tipo === TypeGasto.moto
      );
      console.log(this.gastoMesMoto, 'moto');
    });
  }
  getGastosMesSeleccionadoCasa(month: string) {
    console.log(month);
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesCasa = gasto.filter(
        (item) => item.tipo === TypeGasto.casa
      );
      console.log(this.gastoMesCasa, 'casa');
    });
  }
  getGastosMesSeleccionadoSua(month: string) {
    console.log(month);
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesSua = gasto.filter(
        (item) => item.tipo === TypeGasto.sua
      );
      console.log(this.gastoMesSua, 'sua');
    });
  }
  getGastosMesSeleccionadoCoche(month: string) {
    console.log(month);
    this.gastosService.getGastosMesSeleccionado(month).subscribe((gasto) => {
      this.gastoMesCoche = gasto.filter(
        (item) => item.tipo === TypeGasto.coche
      );
      console.log(this.gastoMesCoche, 'coche');
    });
  }
  private updateChartData(sumaGastoMesPersonal: number, ingresos: number) {
    const newData = {
      labels: this.barChartLabels,
      datasets: [{ data: [sumaGastoMesPersonal, ingresos] }],
    };
    this.barChartData = newData;
  }
  private updateChartDataTipo(sumaGastoMesPersonal: number) {
    const newData = {
      labels: this.barChartLabels,
      datasets: [{ data: [sumaGastoMesPersonal] }],
    };
    this.barChartData2 = newData;
  }

}
