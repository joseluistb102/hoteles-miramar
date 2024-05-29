import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HabitacionService } from '../shared/habitacion.service';
import { HabitacionModel } from '../shared/habitacion.model';

@Component({
  selector: 'app-lista-habitaciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-habitaciones.component.html',
  styleUrl: './lista-habitaciones.component.css'
})
export class ListaHabitacionesComponent implements OnInit {
  habitaciones: HabitacionModel[] = [];

  constructor(private habitacionService: HabitacionService) { }

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones() {
    this.habitacionService.obtenerHabitaciones().subscribe(data => {
      this.habitaciones = data;
    }, error => {
      console.error('Error al obtener las habitaciones', error);
      alert('Error al obtener las habitaciones');
    });
  }
}
