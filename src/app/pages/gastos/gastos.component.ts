import { GastosService } from './../../core/services/gastos.service';
import { IGasto } from 'src/app/core/models/gasto.models';
import { Component } from '@angular/core';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent {
  public  gastos: IGasto[] = [];

  ngOnInit(): void {
    console.log(this.getCars(),15);//lanzo la función al iniciar) 
  }

  constructor(private gastosService: GastosService) {
    
  }
  private getCars() {
    this.gastosService.getGastos().subscribe((gastos) => {
      this.gastos = gastos;
    });
    console.log(this.gastos,18);
  }
 
 
}
