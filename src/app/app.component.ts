import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLink, RouterLinkActive, ToastModule, ButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
  isLoggedIn: boolean = false;
  title = 'frontend';

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkSession();
  }

  checkSession() {
    this.isLoggedIn = !!sessionStorage.getItem('email');
  }

  logOut() {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['inicio']).then(() => {
      window.location.reload();
    });;;
  }

}
