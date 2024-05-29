import { Component, OnInit } from '@angular/core';
import { ReservaModel } from '../shared/reserva.model';
import { FormsModule } from '@angular/forms';
import { ReservaService } from '../shared/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-reserva',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-reserva.component.html',
  styleUrl: './editar-reserva.component.css'
})
export class EditarReservaComponent implements OnInit{

  id_reserva = 0
  reserva = new ReservaModel(0, 0, new Date(), new Date())

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_reserva = this.route.snapshot.params['id_reserva']
    if (this.id_reserva) {
      console.log("EDITAR");
      this.reservaService.obtenerReserva(this.id_reserva).subscribe(data => {
        this.reserva = data[0]
      })
    } 
  }

  onSubmit() {
    console.log('onSubmit');

    if (this.reserva.id_reserva) {
      this.reservaService.actualizarReserva(this.reserva).subscribe(data => {
        alert(data)
        this.router.navigate(['/reservas']).then(() => {
          window.location.reload();
        })
      })
    }
  }
}
