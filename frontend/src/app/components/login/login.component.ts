import { Component, Output, EventEmitter } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ConfirmButtonComponent } from '../confirm-button/confirm-button.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, ConfirmButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email = '';
  password = '';

  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  saveClick: () => void = () => {
    this.onLogin();
  };

  //On login Methode - wird aufgerufen, wenn der Benutzer auf den Login-Button klickt
  onLogin() {
    console.log('Login:', {
      email: this.email,
      password: this.password,
    });
    // Validierung der Eingaben 
    if (!this.email || !this.password) {
      alert('Bitte geben Sie Ihre E-Mail und Ihr Passwort ein.')
      return;
    }else{

    this.authService.login(this.email, this.password)
      .subscribe({
        next: (res) => {
          // Weiterleitung oder Status speichern
          alert('Erfolgreich eingeloggt!');
          console.log('Login erfolgreich:', res);
          this.loginSuccess.emit(); // Event auslösen
        },
        error: (err) => {
          alert('Login fehlgeschlagen! Bitte überprüfen Sie Ihre Anmeldedaten.');
          console.error('Login Fehler:', err);
        }
      });
  }

}
}
