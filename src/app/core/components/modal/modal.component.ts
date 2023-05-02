import { Component } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { GastosService } from '../../services/gastos/gastos.service';
import { IngresosService } from '../../services/ingresos/ingresos.service';
import { IGasto } from '../../services/models/gastos.models';
import { Iingreso } from '../../services/models/ingreso.models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
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
    /**
     * flag para guardar el mes actual
     */
    mesActual:string='';

    gastoMayor:boolean=false;
    ingresoMayor:boolean=false;
  constructor(
    private modalService: ModalService,
    private gastosService: GastosService,
    private ingresosService: IngresosService,
  ) { }
  ngOnInit(): void {
    this.getTotalGastos();
    this.getTotalIngresos();
    this.pintarMesActual();
    // this.calcularGastoMayor();
    
  }
  private getTotalGastos() {
    this.gastosService.getGastosMes().subscribe((gastos) => {
      this.gastos = gastos;
      let suma = 0;
      for (let i = 0; i < this.gastos.length; i++) {
        suma += this.gastos[i].importe;
      }
    this.sumaG = suma;
    });
  }
  private getTotalIngresos() {
    this.ingresosService.getIngresosMes().subscribe((ingresos) => {
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

  closeModal() {
    this.modalService.closeModal();
  }

  pintarMesActual() {
    const fechaActual = new Date();
    const nombreMes = fechaActual.toLocaleDateString('es-ES', { month: 'long' });
    this.mesActual = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
    
  }

}
