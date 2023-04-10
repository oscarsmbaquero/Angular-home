import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatBadgeModule
  ],
  exports:[
    MatBadgeModule
  ]
})
export class MaterialModule { }
