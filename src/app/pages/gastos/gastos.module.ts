import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



import { GastosComponent } from './gastos.component';
import { GastosRoutingModule } from './gastos-routing.module';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { MomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { AnadirComponent } from './components/anadir/anadir.component';
import { MostrarComponent } from './components/mostrar/mostrar.component';
import { TodosComponent } from './components/todos/todos.component';



@NgModule({
  declarations: [
    GastosComponent,
    AnadirComponent,
    MostrarComponent,
    TodosComponent
  ],
  imports: [  
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GastosRoutingModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    SharedModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true }
    },
    DatePipe
  ],
})
export class GastosModule { }
