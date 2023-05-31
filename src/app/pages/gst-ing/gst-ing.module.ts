import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GstIngComponent } from './gst-ing.component';
import { GastIngreRoutingModule } from './gast-ing-routing.module';
//material  modules
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
// import { MatTableModule } from '@angular/material/table';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { GraficaMesComponent } from './components/grafica-mes/grafica-mes.component';
import { GraficaTipoComponent } from './components/grafica-tipo/grafica-tipo.component';
import { GraficaAnioComponent } from './components/grafica-anio/grafica-anio.component';




@NgModule({
  declarations: [
    GstIngComponent,
    GraficaMesComponent,
    GraficaTipoComponent,
    GraficaAnioComponent,
  ],
  imports: [
    CommonModule,
    GastIngreRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    NgChartsModule,
  ]
})
export class GstIngModule { }
