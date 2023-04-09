import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { GastosModule } from './pages/gastos/gastos.module';

const routes: Routes = [

  // {
  //   path: "",//raiz de la app
  //   pathMatch:'full',//coincida nombre exacto
  //   loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule)
  // },
  {
    path: "gastos",
    loadChildren: () => import('src/app/pages/gastos/gastos.module').then(m => m.GastosModule)
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
