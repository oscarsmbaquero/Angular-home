import { GastosService } from './../../core/services/gastos/gastos.service';
import { IGasto } from '../../core/services/models/gastos.models';
import { Component } from '@angular/core';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent {
  public  gastos: IGasto[] = [];
  public gastosMes:IGasto[] = [];
  ngOnInit(): void {
   this.getGastos();
   this.gastosMesCurso();
  //  this.gastosMesCurso();
  }

  constructor(private gastosService: GastosService) {
    
  }
  private getGastos() {
    this.gastosService.getGastos().subscribe((gastos) => {
      this.gastos = gastos;
      console.log(this.gastos,18);
      
    });
  }

  private gastosMesCurso() {
    this.gastosService.getGastosMes().subscribe((gastos) => {
      this.gastosMes = gastos;
      console.log(this.gastosMes, 26);
    });
  }

  // private gastosMesCurso(gastos: IGasto[]) {    
  //   const today = new Date();
  //   const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);    
  //   const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);  
  //   const gastosMes:IGasto[] = [];
  
  //   gastos.forEach(gasto => {
  //     console.log(gasto.fecha, 29);
  //     if (gasto.fecha >= firstDayOfMonth && gasto.fecha <= lastDayOfMonth) {
  //       console.log(gasto, 44);
        
  //       gastosMes.push(gasto);
  //     }
  //   });
  //   console.log(gastosMes, 36);
    
  //   return gastosMes;
  // }
  // private gastosMesCurso(gastos: IGasto[]) {    
  //   const today = new Date();
  //   const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);    
  //   const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);    
  //   gastos.forEach(gasto => {
  //     const gastoDate = new Date(gasto.fecha);
  //     if (gastoDate.getTime() >= firstDayOfMonth.getTime() && gastoDate.getTime() <= lastDayOfMonth.getTime()) {
  //       this.gastosMes.push(gasto);
  //     }
  //   });    
  //   console.log(this.gastosMes, 36)
  //   // return this.gastosMes;
  // }
  
 
 
}
