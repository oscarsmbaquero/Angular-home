import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    LoadingComponent,
    ModalComponent
  ]
})
export class SharedModule { }
