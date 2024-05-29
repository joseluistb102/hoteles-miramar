import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { ListaReservasComponent } from './lista-reservas/lista-reservas.component';
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component';
import { ReservaService } from './shared/reserva.service';
import { InicioComponent } from './inicio/inicio.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { HotelesComponent } from './hoteles/hoteles.component';
import { ListaHabitacionesComponent } from './lista-habitaciones/lista-habitaciones.component';
import { AgregarReservaComponent } from './agregar-reserva/agregar-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaReservasComponent,
    AgregarReservaComponent,
    EditarReservaComponent,
    InicioComponent,
    AyudaComponent,
    ContactoComponent,
    HotelesComponent,
    ListaHabitacionesComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  providers: [
    ReservaService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }