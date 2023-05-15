import { Component } from '@angular/core';
//import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent {
  fechaSeleccionada!: Date; // Usar el operador '!' para indicar que no puede ser nula

  // fechaSeleccionadaCambiada(event: MatDatepickerInputEvent<Date>) {
  //   this.fechaSeleccionada = event.value!;
  //   // Aquí puedes realizar la consulta a la base de datos utilizando la fecha seleccionada
  // }

}
