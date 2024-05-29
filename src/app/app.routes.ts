import { Routes } from '@angular/router';
import { ListaReservasComponent } from './lista-reservas/lista-reservas.component';
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component';
import { InicioComponent } from './inicio/inicio.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth.guard';
import { HotelesComponent } from './hoteles/hoteles.component';
import { ListaHabitacionesComponent } from './lista-habitaciones/lista-habitaciones.component';
import { AgregarReservaComponent } from './agregar-reserva/agregar-reserva.component';

export const routes: Routes = [
    { path:'reservas', component: ListaReservasComponent, canActivate: [authGuard] },
    { path:'reservas/editar/:id_reserva', component: EditarReservaComponent, canActivate: [authGuard]},
    { path:'reservas/agregar', component: AgregarReservaComponent, canActivate: [authGuard]},
    { path:'inicio', component: InicioComponent},
    { path:'ayuda', component: AyudaComponent},
    { path:'contacto', component: ContactoComponent},
    { path:'hoteles', component: HotelesComponent},
    { path:'habitaciones', component: ListaHabitacionesComponent},
    { path:'login', component: LoginComponent},
    { path:'register', component: RegisterComponent},
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];
