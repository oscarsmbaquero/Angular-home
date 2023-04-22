import { Component, OnInit } from '@angular/core';

import { GastosService } from '../../services/gastos/gastos.service';
import { IngresosService } from '../../services/ingresos/ingresos.service';
import { IGasto } from '../../services/models/gastos.models';
import { Iingreso } from '../../services/models/ingreso.models';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent  implements OnInit{
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
     * flag para guardar la diferencia
     */
    diferencia:number=0;
    gastoMayor:boolean=false;
    ingresoMayor:boolean=false;

  constructor(
    private gastosService: GastosService,
    private ingresosService: IngresosService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getTotalGastos();
    this.getTotalIngresos();
    // this.calcularGastoMayor();
    
  }
  private getTotalGastos() {
    this.gastosService.getGastos().subscribe((gastos) => {
      this.gastos = gastos;
      let suma = 0;
      for (let i = 0; i < this.gastos.length; i++) {
        suma += this.gastos[i].importe;
      }
    this.sumaG = suma;
    });
  }
  private getTotalIngresos() {
    this.ingresosService.getIngreso().subscribe((ingresos) => {
      this.ingresos = ingresos;
      let suma = 0;
      for (let i = 0; i < this.ingresos.length; i++) {
        suma += this.ingresos[i].importe;
      }
    this.sumaIngreso = suma;
    console.log(this.sumaIngreso,60)
    });
  }
  calcularDiferencia(){
    if(this.sumaIngreso > this.sumaG){
      this.diferencia= this.sumaIngreso - this.sumaG
    }else{
      this.diferencia= this.sumaIngreso - this.sumaG
    }
    return this.diferencia;
  }
  openModal() {
    this.modalService.openModal();
  }

  // calcularGastoMayor(){
  //   if(this.sumaG > this.sumaIngreso){
  //    this.gastoMayor = true
  //   }else{
  //     this.ingresoMayor = true
  //   }
  // }

}
