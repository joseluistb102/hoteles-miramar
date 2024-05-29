import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservaModel } from './reserva.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  BASE_URL= 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  obtenerReservas() {
    return this.http.get<ReservaModel[]>(this.BASE_URL+'/reservas')
  }

  obtenerReserva(id_reserva: number) {
    return this.http.get<ReservaModel[]>(`${this.BASE_URL}/reservas/${id_reserva}`)
  }

  agregarReserva(reserva: ReservaModel): Observable<any>{
    return this.http.post<string>(`${this.BASE_URL}/reservas/agregar`, reserva);
  }

  actualizarReserva(reserva: ReservaModel){
    return this.http.put<string>(`${this.BASE_URL}/reservas/actualizar/${reserva.id_reserva}`, reserva)
  }

  borrarReserva(id_reserva: number) {
    return this.http.delete<string>(`${this.BASE_URL}/reservas/borrar/${id_reserva}`)
  }
}
