import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowTitleComponent } from '../window-title/window-title.component';
import { AuthService } from '../../services/auth.service';
import { OutputButtonComponent } from '../output-button/output-button.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil-view',
  standalone: true,
  imports: [
    CommonModule,
    WindowTitleComponent,
    OutputButtonComponent
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
    const token = localStorage.getItem('token');
    if (!token) {
      this.currentUser = { email: '', name: '' };
      return;
    }
    const payload = this.decodeJwtPayload(token);
    this.currentUser.email = payload?.email || '';
    this.currentUser.name = payload?.name || '';
  }

  // Hilfsfunktion zum Decodieren des JWT-Payloads
  decodeJwtPayload(token: string): any {
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(payloadJson)));
    } catch {
      return null;
    }
  }

  
logout() {
  this.authService.logout();
}
}