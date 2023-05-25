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
private getTareas() {
  this.tareasService.getTareas().subscribe((tareas) => {
    this.tareas = tareas;
    console.log(this.tareas,24);
  });   
}
dateClass = (date: Date): MatCalendarCellCssClasses => {
  const taskDates = this.tareas.map(task => {
    const formattedDate = new Date(task.fecha).toISOString().substring(0, 10);
    return formattedDate;
  });
  const dateString = date.toISOString().substring(0, 10);
  
  const foundDate = taskDates.find(d => d === dateString);
  if (foundDate) {
    console.log('Si')
    return 'has-tasks';
  } else {
    console.log('No')
    return '';
  }
}








}
