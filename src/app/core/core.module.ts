import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ModalComponent } from '../shared/components/modal/modal.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    //ModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
    
  ],
  exports: [
    
  ]
})
export class CoreModule { }
