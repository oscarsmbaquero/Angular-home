import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ITareas } from 'src/app/core/services/models/tareas.models';

@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.component.html',
  styleUrls: ['./anadir.component.css'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AnadirComponent {
  // Incialización del formulario
public registerTarea: FormGroup;
// variable submitted a false
public submitted: boolean = false;

constructor(
  private formBuilder: FormBuilder,
){
  this.registerTarea = this.formBuilder.group({
    descripcion: ['', [Validators.required, Validators.maxLength(20)]],
    fecha: [''],
    prioridad:[''],
    tipo: ['', [Validators.required]],
    //image: ['', [Validators.required]],
  });
}

public onSubmit(): void {
 // El usuario ha pulsado en submit->cambia a true submitted
 this.submitted = true;
 // Si el formulario es valido
 if (this.registerTarea.valid) {
   // Creamos un Usuario y lo emitimos
   const tarea: ITareas = {
     
     descripcion: this.registerTarea.get('descripcion')?.value,
     prioridad: this.registerTarea.get('prioridad')?.value,
     fecha: this.registerTarea.get('fecha')?.value.toISOString().substring(0, 10),
     tipo: this.registerTarea.get('tipo')?.value,
    
   };
  //  console.log(gasto);
  //  this.gastosService.addGasto(gasto).subscribe(
  //    (response) => {
  //      console.log('Datos enviados con éxito');
  //      this.snackBar.open('El gasto ha sifo añadido correctamente', 'Cerrar', {
  //        duration: 3000
  //      });
  //      this.router.navigate(['']);
  //    },
  //    (error) => {
  //      console.error('Error al enviar los datos', error);
  //    }
  //  );
 }
 
 }

}





