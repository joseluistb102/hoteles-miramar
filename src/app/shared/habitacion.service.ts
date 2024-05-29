import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HabitacionModel } from './habitacion.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  BASE_URL= 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  obtenerHabitaciones() {
    return this.http.get<HabitacionModel[]>(this.BASE_URL+'/habitaciones')
  }
  
}
