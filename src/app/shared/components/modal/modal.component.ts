import { Component } from '@angular/core';
import { ModalService } from '../../../core/services/modal/modal.service';
import { GastosService } from '../../../core/services/gastos/gastos.service';
import { IngresosService } from '../../../core/services/ingresos/ingresos.service';
import { IGasto } from '../../../core/services/models/gastos.models';
import { Iingreso } from '../../../core/services/models/ingreso.models';

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
    sumaNextMonth: number =0;
    diferencia:number=0;
    /**
     * flag para guardar el mes actual
     */
    mesActual:string='';

    gastoMayor:boolean=false;
    ingresoMayor:boolean=false;

    gastoNextMonth: IGasto[]=[];
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
    });
  }
  calcularDiferencia(){
    if(this.sumaIngreso > this.sumaG){
      this.diferencia= this.sumaIngreso - this.sumaG
    }else{
      this.diferencia= this.sumaIngreso - this.sumaG
    }
    this.gastoMesproximo();
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
  gastoMesproximo(){
    this.gastosService.getGastosMesSiguiente().subscribe((element)=>{
      console.log(element)
      this.gastoNextMonth =element;
      console.log(this.gastoNextMonth,101)
      let suma = 0;
      for (let i = 0; i < this.gastoNextMonth.length; i++) {
        suma += this.gastoNextMonth[i].importe;
      }
    this.sumaNextMonth = suma;
    console.log(this.sumaNextMonth)
    })
    
  }

}
