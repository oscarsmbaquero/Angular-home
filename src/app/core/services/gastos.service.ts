import { IGasto } from '../models/gasto.models';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { OnInit } from '@angular/core';

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
}
