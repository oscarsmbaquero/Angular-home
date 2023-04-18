import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareasComponent } from './tareas.component';
import { TareasRoutingModule } from './tareas-routing.module';



@NgModule({
  declarations: [
    TareasComponent
  ],
  imports: [
    CommonModule,
    TareasRoutingModule
    
  ]
})
export class TareasModule { }
