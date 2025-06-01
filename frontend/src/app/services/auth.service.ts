import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class AuthService {
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  logout() {
    localStorage.removeItem(this.tokenKey);
    console.log('Ausgeloggt');
  }

  //registerservice
  register(user: { email: string; name: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/register', user);
  }


//loginservice
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>('http://localhost:8080/api/login', { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenKey, res.token);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
