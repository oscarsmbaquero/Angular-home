import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraComponent } from './compra.component';
import { CompraRoutingModule } from './compra-routing.module';



@NgModule({
  declarations: [
    CompraComponent
  ],
  imports: [
    CommonModule,
    CompraRoutingModule
  ]
})
export class CompraModule { }
