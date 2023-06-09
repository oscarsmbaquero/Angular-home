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
  tareasMes:any[]=[];
  hasTasks = false;
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
// private getTareas() {
//   this.tareasService.getTareas().subscribe((tareas) => {
//     const tareasFechaFormat = tareas.map(tarea => {
//       const fecha = new Date(tarea.fecha);
//       const fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd');
//       return { ...tarea, fecha: fechaFormateada };
//     });

//     // this.tareas.fecha = fechasFormateadas;
//   console.log(tareasFechaFormat,50);
//   const fechaActual = new Date();
//   const fechaInicioMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
//   const fechaFinMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
//   const fechaInicioMesFormateada = this.datePipe.transform(fechaInicioMes, 'yyyy-MM-dd') || '';
//   const fechaFinMesFormateada = this.datePipe.transform(fechaFinMes, 'yyyy-MM-dd')|| '';
//   console.log(fechaInicioMesFormateada,fechaFinMesFormateada,56)
  
//   const resultado:ITareas[] = tareasFechaFormat.map((element)=>{
//     if(element.fecha){
//       if(element.fecha >= fechaInicioMesFormateada && element.fecha <= fechaFinMesFormateada){
//         this.tareasMes.push(resultado);
//         this.hasTasks = true;     
//         console.log(this.hasTasks)
//     }else{
//       console.log('No');
//       this.hasTasks = false;     
//       console.log(this.hasTasks)
//     }
//     }
//   })
//   });
//   this.hasTasks = this.hasTasks;
//   console.log(this.hasTasks)
  


//  }
private getTareas() {
  this.tareasService.getTareas().subscribe((tareas) => {
    const tareasFechaFormat = tareas.map(tarea => {
      const fecha = new Date(tarea.fecha);
      const fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd');
      return { ...tarea, fecha: fechaFormateada };
    });

    console.log(tareasFechaFormat, 50);

    const fechaActual = new Date();
    const fechaInicioMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const fechaFinMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
    const fechaInicioMesFormateada = this.datePipe.transform(fechaInicioMes, 'yyyy-MM-dd') || '';
    const fechaFinMesFormateada = this.datePipe.transform(fechaFinMes, 'yyyy-MM-dd') || '';
    console.log(fechaInicioMesFormateada, fechaFinMesFormateada, 56);

    this.tareasMes = []; // Limpiar el arreglo antes de agregar las tareas

    tareasFechaFormat.forEach((element) => {
      if (element.fecha) {
        if (element.fecha >= fechaInicioMesFormateada && element.fecha <= fechaFinMesFormateada) {
          this.tareasMes.push(element); 
          // Agregar la tarea actual a tareasMes
          this.hasTasks = true;
          
        } else {
          console.log('No');
          this.hasTasks = false;
        }
        console.log(this.tareasMes);
      }
    });

    
    
    console.log(this.hasTasks);
  });
}
// dateClass = (date: Date): string => {
//   //const fecha = this.datePipe.transform(date, 'yyyy-MM-dd');
//   const fecha = date.toISOString().substring(0, 10);
//   console.log(fecha, 'fecha');  
//    const tareaEncontrada = this.tareasMes.find(tarea => tarea.fecha === fecha);
//    console.log(tareaEncontrada,'tareaEncontarda')
//    return tareaEncontrada ? 'highlight' : '';
// };
dateClass = (date: Date): string => {
  const fecha = date.toISOString().substring(0, 10);
  console.log(fecha, 'fecha');

  const tareaEncontrada = this.tareasMes.find(tarea => tarea.fecha === fecha);
  const fechaTareaEncontrada = tareaEncontrada ? tareaEncontrada.fecha : ''; // Extraer el campo "fecha" de tareaEncontrada

  console.log(fechaTareaEncontrada, 'fechaTareaEncontrada');

  return tareaEncontrada ? 'mat-calendar-cell-highlight' : '';
};
hasTareasEnFecha(fecha: string): boolean {
  return this.tareasMes.some(tarea => tarea.fecha === fecha);
}




}














