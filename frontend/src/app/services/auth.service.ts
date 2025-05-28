import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class AuthService {
  constructor(private http: HttpClient) {}

//registerservice
  register(user: { email: string; name: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/register', user);
  }


//loginservice
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/login', {email, password });
  }

}
