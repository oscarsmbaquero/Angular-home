import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ModalComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    LoadingComponent,
    ModalComponent,
    CardComponent
  ]
})
export class SharedModule { }
