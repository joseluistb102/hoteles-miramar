import { Component, OnInit } from '@angular/core';
import { ReservaModel } from '../shared/reserva.model';
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../shared/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-reserva',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agregar-reserva.component.html',
  styleUrl: './agregar-reserva.component.css'
})
export class AgregarReservaComponent implements OnInit {

  id_reserva = 0
  reserva = new ReservaModel(0, 0, new Date(), new Date())

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_reserva = this.route.snapshot.params['id_reserva']

    console.log("CREAR")
  }

  onSubmit() {
    console.log('onSubmit');
    console.log('crear');
    this.reservaService.agregarReserva(this.reserva).subscribe(
      data => {
        if (data.error) {
          alert(data.error); // Muestra el mensaje de error si existe
        } else {
          alert(data); // Muestra el mensaje de éxito
          this.router.navigate(['/reservas']).then(() => {
            window.location.reload();
          });
        }
      },
      error => {
        console.error(error);
        alert('Error al crear la reserva');
      }
    );
  }
}
