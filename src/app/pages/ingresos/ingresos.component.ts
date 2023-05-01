
import { Component } from '@angular/core';
import { IngresosService } from './../../core/services/ingresos/ingresos.service';
import { Iingreso } from 'src/app/core/services/models/ingreso.models';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent {
  public  ingresos: Iingreso[] = [];
  public  ingresosMes: Iingreso[] = [];

  ngOnInit(): void {
    this.getIngresos();
    this.getIngresosMes();
   }
   constructor(private ingresosService: IngresosService) {
    
   }
   private getIngresos() {
    this.ingresosService.getIngreso().subscribe((ingresos) => {
      this.ingresos = ingresos;
      console.log(this.ingresos,24);
    });   
  }
  private getIngresosMes() {
    this.ingresosService.getIngresosMes().subscribe((ingresoMes) => {
      this.ingresosMes = ingresoMes;
      console.log(this.ingresosMes,39);
    });   
  }
}
