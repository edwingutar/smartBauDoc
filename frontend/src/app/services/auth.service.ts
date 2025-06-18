import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class AuthService {
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.http.post('http://localhost:8080/api/logout', {}).subscribe({
      next: () => {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/AuthView']);
        console.log('Erfolgreich abgemeldet');
      },
      error: (err) => {
        console.error('Fehler beim Logout:', err);
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/AuthView']);
      }
    });
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
