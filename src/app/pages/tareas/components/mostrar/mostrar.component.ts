import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ITareas } from 'src/app/core/services/models/tareas.models';
//import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TareasService } from 'src/app/core/services/tareas/tareas.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit{
  /**
   * flag para almacenar las tareas
   */
  tareas:ITareas[]=[];
  
  hasTasks = false;
  dateClass:any
  fechaSeleccionada!: Date; // Usar el operador '!' para indicar que no puede ser nula
  
  // fechaSeleccionadaCambiada(event: MatDatepickerInputEvent<Date>) {
  //   this.fechaSeleccionada = event.value!;
  //   // Aquí puedes realizar la consulta a la base de datos utilizando la fecha seleccionada
  // }
constructor(
  private tareasService:TareasService,
  private datePipe: DatePipe
){}

ngOnInit(){
this.getTareas();
}
// private getTareas() {
//   this.tareasService.getTareas().subscribe((tareas) => {
//     this.tareas = tareas;
//     console.log(this.tareas,24);
//   });   
  
// }
private getTareas() {
  this.tareasService.getTareas().subscribe((tareas) => {
    const tareasFechaFormat = tareas.map(tarea => {
      const fecha = new Date(tarea.fecha);
      const fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd');
      return { ...tarea, fecha: fechaFormateada };
    });

    // this.tareas.fecha = fechasFormateadas;
  console.log(tareasFechaFormat,50);
  const fechaActual = new Date();
  const fechaInicioMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
  const fechaFinMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
  const fechaInicioMesFormateada = this.datePipe.transform(fechaInicioMes, 'yyyy-MM-dd') || '';
  const fechaFinMesFormateada = this.datePipe.transform(fechaFinMes, 'yyyy-MM-dd')|| '';
  console.log(fechaInicioMesFormateada,fechaFinMesFormateada,56)
  let hasTasks = false;
  const resultado =tareasFechaFormat.map((element)=>{
    if(element.fecha){
      if(element.fecha >= fechaInicioMesFormateada && element.fecha <= fechaFinMesFormateada){
        this.hasTasks = true;     
        console.log(this.hasTasks)
    }else{
      console.log('No');
      this.hasTasks = false;     
      console.log(this.hasTasks)
    }
    }
  })
  });
  this.hasTasks = this.hasTasks;
  console.log(this.hasTasks)
  


 }

}














