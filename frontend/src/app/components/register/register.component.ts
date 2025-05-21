import {Component, Input} from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ConfirmButtonComponent } from '../confirm-button/confirm-button.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ConfirmButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  name: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwörter stimmen nicht überein!');
    } else {
      this.authService.register({
        email: this.email,
        name: this.name,
        password: this.password
      }).subscribe({
        next: () => alert('Registrierung erfolgreich!'),
        error: () => alert('Fehler bei der Registrierung!') 
      });
    }
  }


  onForgotPassword() {
    console.log('Passwort vergessen in Registrierung geklickt');
  }
}
