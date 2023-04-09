import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastosComponent } from './gastos.component';
import { GastosRoutingModule } from './gastos-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GastosComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    RouterModule

  ]
})
export class GastosModule { }
