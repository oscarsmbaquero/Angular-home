import { IGasto } from '../models/gastos.models';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

interface MonthIndex {
  [key: string]: number;
}
@Injectable({
  providedIn: 'root'
})
export class GastosService implements OnInit{

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit() {
    this.httpClient.get('https://node-home-oscarsmbaquero.vercel.app/gastos').subscribe(data => {
      console.log(data,17);
    });
  }
  

  public getGastos():Observable<IGasto[]> {
    return this.httpClient.get<IGasto[]>(`${environment.apiUrl}gastos`);
  }

  public addGasto(body: IGasto): Observable<IGasto> {
    return this.httpClient.post<IGasto>(
      `${environment.apiUrl}gastos`,
      body
    );
  }
  public getGastosMes(): Observable<IGasto[]> {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
    return this.httpClient.get<IGasto[]>(`${environment.apiUrl}gastos`).pipe(
      map(gastos => gastos.filter(gasto => {
        const gastoDate = new Date(gasto.fecha);
        return gastoDate.getTime() >= firstDayOfMonth.getTime() && gastoDate.getTime() <= lastDayOfMonth.getTime();
      }))
    );
  }

  public getGastosMesSeleccionado(month: string): Observable<IGasto[]> {
    
    const monthIndex: MonthIndex  = {
      'January': 0,
      'February': 1,
      'March': 2,
      'April': 3,
      'May': 4,
      'June': 5,
      'July': 6,
      'August': 7,
      'September': 8,
      'October': 9,
      'November': 10,
      'December': 11
    };
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), monthIndex[month], 1);
    const lastDayOfMonth = new Date(today.getFullYear(), monthIndex[month] + 1, 0);
    
    return this.httpClient.get<IGasto[]>(`${environment.apiUrl}gastos`).pipe(
      map(gastos => gastos.filter(gasto => {
        const gastoDate = new Date(gasto.fecha);
        const gastoMonth = gastoDate.getMonth();
        console.log(gastoMonth, 987)
        return gastoMonth === monthIndex[month] && gastoDate.getTime() >= firstDayOfMonth.getTime() && gastoDate.getTime() <= lastDayOfMonth.getTime();
      }))
    );
  } 

}
