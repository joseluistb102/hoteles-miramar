import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.BASE_URL}/users`, userDetails);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, { email, password });
  }

}
