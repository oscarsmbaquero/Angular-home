import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { IGasto } from '../../../../core/models/gasto.models';
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

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
public registerGasto: FormGroup;
// variable submitted a false
public submitted: boolean = false;

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  
  ) {
    // Nuestro formulario - sin campos por defecto
    // Podemos meter valores por defecto en las comillas
     this.registerGasto = this.formBuilder.group({
       descripcion: ['', [Validators.required, Validators.maxLength(20)]],
       importe: ['', [Validators.required, Validators.maxLength(20)]],
       fecha: [''],
       tipo: ['', [Validators.required]],
       //image: ['', [Validators.required]],
     });
  }

  public onSubmit(): void {
    // El usuario ha pulsado en submit->cambia a true submitted
    this.submitted = true;
    // Si el formulario es valido
    if (this.registerGasto.valid) {
      // Creamos un Usuario y lo emitimos
      const gasto: IGasto = {
        
        descripcion: this.registerGasto.get('descripcion')?.value,
        importe: this.registerGasto.get('importe')?.value,
        fecha: this.registerGasto.get('fecha')?.value,
        tipo: this.registerGasto.get('tipo')?.value,
        //image: this.registerCar.get('image')?.value,
        //  type: this.registerCar.get('type')?.value,
       
      };
      console.log(gasto.fecha);
      console.log(gasto.fecha.toISOString().substring(0, 10));
    //   this.carsservice.addCars(car).subscribe(
    //    (response) => {
    //      console.log('Datos enviados con éxito');
    //    },
    //    (error) => {
    //      console.error('Error al enviar los datos', error);
    //    }
    //  );
   }
   this.router.navigate(['gastos']);
   }
      // Reseteamos todos los campos y el indicador de envío o submitted
     //  this.registerCar.reset();
     //  this.submitted = false;
    }


