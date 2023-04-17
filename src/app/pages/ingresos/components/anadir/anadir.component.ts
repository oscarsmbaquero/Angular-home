import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { Iingreso } from '../../../../core/services/models/ingreso.models';
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
public registerIngreso: FormGroup;
// variable submitted a false
public submitted: boolean = false;

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  
  ) {
    // Nuestro formulario - sin campos por defecto
    // Podemos meter valores por defecto en las comillas
     this.registerIngreso = this.formBuilder.group({
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
    if (this.registerIngreso.valid) {
      // Creamos un Usuario y lo emitimos
      const ingreso: Iingreso = {
        
        descripcion: this.registerIngreso.get('descripcion')?.value,
        importe: this.registerIngreso.get('importe')?.value,
        fecha: this.registerIngreso.get('fecha')?.value.toISOString().substring(0, 10),
        tipo: this.registerIngreso.get('tipo')?.value,
       
      };
      console.log(ingreso);
   }
   this.router.navigate(['gastos']);
   }
      // Reseteamos todos los campos y el indicador de envío o submitted
     //  this.registerCar.reset();
     //  this.submitted = false;
    }


