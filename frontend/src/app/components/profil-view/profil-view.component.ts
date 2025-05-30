import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowTitleComponent } from '../window-title/window-title.component';
import { AuthService } from '../../services/auth.service';
import { ConfirmButtonComponent } from '../confirm-button/confirm-button.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil-view',
  standalone: true,
  imports: [
    CommonModule,
    WindowTitleComponent,
    ConfirmButtonComponent
  ],
  templateUrl: './profil-view.component.html',
  styleUrls: ['./profil-view.component.css']
})
export class ProfilViewComponent implements OnInit {
  @Input() title: string = 'Mein Profil';

  currentUser = {
    email: 'beispiel@mail.com',
    name: 'Testbenutzer'
  };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Versuchen, Benutzerdaten zu laden, aber nicht zur Login-Seite umleiten
    this.tryLoadUserData();
  }

  tryLoadUserData(): void {
    // Token abrufen
    const token = localStorage.getItem('token');
    
    // Wenn kein Token vorhanden ist, zeige Beispieldaten an
    if (!token) {
      console.log('Kein Token gefunden, zeige Beispieldaten');
      return;
    }
    
    // Falls Token vorhanden, versuche Daten zu laden
    this.http.get('http://localhost:8080/api/user/current', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (user: any) => {
        this.currentUser = {
          email: user.email,
          name: user.name
        };
      },
      error: (err) => {
        console.error('Fehler beim Laden der Benutzerdaten:', err);
        // Keine Umleitung zur Login-Seite
      }
    });
  }

  logout = () => {
    // HTTP-Request zum Abmelden beim Server
    this.http.post('http://localhost:8080/api/logout', {}).subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Fehler beim Logout:', err);
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}