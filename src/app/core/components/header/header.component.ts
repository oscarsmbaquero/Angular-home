import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas/tareas.service';
import { ITareas } from '../../services/models/tareas.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 /**
  * flag almacenar las tareas
  */
  numeroTareas:number=0;

  constructor(
    private tareasService:TareasService,
    private router: Router
  ){ }

  ngOnInit(){
    console.log('Entro')
    this.getNumeroTareas();
  }

  private getNumeroTareas() {
    console.log('Entro')
    const mesActual = new Date().getMonth(); // Obtenemos el mes actual (0-11)
  
    this.tareasService.getTareas().subscribe((tareas) => {
      const tareasFiltradas = tareas.filter((tarea) => {
        const mesTarea = new Date(tarea.fecha).getMonth();
        return mesTarea === mesActual;
      });  
      this.numeroTareas = tareasFiltradas.length;
    });
  }

  isCollapse = true;
  toggleState() {
    let foo = this.isCollapse
    this.isCollapse = foo === false ? true : false;
  }
  loggedIn = false;
  loggedUser:any = null;

  logout(){
    
  }
  

}
