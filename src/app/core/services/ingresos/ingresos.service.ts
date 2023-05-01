import { Injectable } from '@angular/core';
import { Iingreso } from '../models/ingreso.models';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresosService implements OnInit{

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit() {
    // this.httpClient.get('https://node-home-oscarsmbaquero.vercel.app/ingresos').subscribe(data => {
    //   console.log(data,17);
    // });
  }

  public getIngreso():Observable<Iingreso[]> {
    return this.httpClient.get<Iingreso[]>(`${environment.apiUrl}ingresos`);
  }

  public addIngreso(body: Iingreso): Observable<Iingreso> {
    return this.httpClient.post<Iingreso>(
      `${environment.apiUrl}ingresos`,
      body
    );
  }
  public getIngresosMes(): Observable<Iingreso[]> {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
    return this.httpClient.get<Iingreso[]>(`${environment.apiUrl}ingresos`).pipe(
      map(ingresos => ingresos.filter(ingreso => {
        const ingresoDate = new Date(ingreso.fecha);
        console.log(ingresoDate,41)
        return ingresoDate.getTime() >= firstDayOfMonth.getTime() && ingresoDate.getTime() <= lastDayOfMonth.getTime();
        
      }))
    );
  }
}
