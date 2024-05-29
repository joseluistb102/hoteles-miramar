import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaModel } from '../shared/reserva.model';
import { ReservaService } from '../shared/reserva.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.css'
})
export class ListaReservasComponent implements OnInit {
  reservas: ReservaModel[] = [];

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservaService.obtenerReservas().subscribe(data => {
      this.reservas = data;
    }, error => {
      console.error('Error al obtener las reservas', error);
      alert('Error al obtener las reservas');
    });
  }

  borrarReserva(id_reserva: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.reservaService.borrarReserva(id_reserva).subscribe(response => {
        alert('Reserva eliminada correctamente');
        this.cargarReservas();
        window.location.reload();
      }, error => {
        console.error('Error al eliminar la reserva', error);
        alert('Error al eliminar la reserva');
      });
    }
  }
}