import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { GastosModule } from './pages/gastos/gastos.module';

const routes: Routes = [

  {
    path: "",//raiz de la app
    pathMatch:'full',//coincida nombre exacto
    loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: "gastos",
    loadChildren: () => import('src/app/pages/gastos/gastos.module').then(m => m.GastosModule)
   },
   {
    path: "ingresos",
    loadChildren: () => import('src/app/pages/ingresos/ingresos.module').then(m => m.IngresosModule)
   },
   {
    path: "gsvsin",
    loadChildren: () => import('src/app/pages/gst-ing/gst-ing.module').then(m => m.GstIngModule)
   },
   {
    path: "tareas",
    loadChildren: () => import('src/app/pages/tareas/tareas.module').then(m => m.TareasModule)
   },
   {
    path: "compra",
    loadChildren: () => import('src/app/pages/compra/compra.module').then(m => m.CompraModule)
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
