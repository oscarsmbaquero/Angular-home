import { Injectable } from '@angular/core';
import { Iingreso } from '../models/ingreso.models';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngresosService implements OnInit{

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit() {
    this.httpClient.get('https://node-home-oscarsmbaquero.vercel.app/gastos').subscribe(data => {
      console.log(data,17);
    });
  }

  public getIngreso():Observable<Iingreso[]> {
    return this.httpClient.get<Iingreso[]>(`${environment.apiUrl}gastos`);
  }

  public addIngreso(body: Iingreso): Observable<Iingreso> {
    return this.httpClient.post<Iingreso>(
      `${environment.apiUrl}gastos`,
      body
    );
  }
}
