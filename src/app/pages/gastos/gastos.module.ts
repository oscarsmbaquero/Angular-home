import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GastosComponent } from './gastos.component';
import { GastosRoutingModule } from './gastos-routing.module';
import { RouterModule } from '@angular/router';

import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { MatTableModule } from '@angular/material/table';

import { AnadirComponent } from './components/anadir/anadir.component';
import { MostrarComponent } from './components/mostrar/mostrar.component';



@NgModule({
  declarations: [
    GastosComponent,
    AnadirComponent,
    MostrarComponent
  ],
  imports: [  
    CommonModule,
    ReactiveFormsModule,
    GastosRoutingModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule

  ]
})
export class GastosModule { }
