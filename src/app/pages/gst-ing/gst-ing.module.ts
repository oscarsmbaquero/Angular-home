import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GstIngComponent } from './gst-ing.component';
import { GastIngreRoutingModule } from './gast-ing-routing.module';



@NgModule({
  declarations: [
    GstIngComponent
  ],
  imports: [
    CommonModule,
    GastIngreRoutingModule
  ]
})
export class GstIngModule { }
