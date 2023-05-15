import { Injectable } from '@angular/core';
import { Iingreso } from '../models/ingreso.models';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ITareas } from '../models/tareas.models';


@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(
    private httpClient: HttpClient
  ) { }


  public getTareas():Observable<ITareas[]> {
    return this.httpClient.get<ITareas[]>(`${environment.apiUrl}tareas`);
  }

  public addIngreso(body: ITareas): Observable<ITareas> {
    return this.httpClient.post<ITareas>(
      `${environment.apiUrl}tareas`,
      body
    );
  }
}
