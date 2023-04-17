import { Component } from '@angular/core';
import { GastosService } from './../../core/services/gastos/gastos.service';
import { IGasto } from 'src/app/core/services/models/gastos.models';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent {
  public  ingresos: IGasto[] = [];

  ngOnInit(): void {
    this.getIngresos();
   }
   constructor(private gastosService: GastosService) {
    
   }
   private getIngresos() {
    this.gastosService.getGastos().subscribe((ingresos) => {
      this.ingresos = ingresos;
      console.log(this.ingresos,18);
    });
   
  }

}
