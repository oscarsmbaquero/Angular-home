import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'home';

  @Output() openmodal = new EventEmitter<string>();



  openModal(){
    this.openmodal.emit('Hola')
    console.log('Entro')
  }
}
