import {Component, Input} from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ConfirmButtonComponent } from '../confirm-button/confirm-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ConfirmButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  email = '';
  name = '';
  password = '';
  confirmPassword = '';

  onRegister() {
    console.log('Registrieren:', {
      email: this.email,
      name: this.name,
      password: this.password,
      confirmPassword: this.confirmPassword
    });

    if (this.password !== this.confirmPassword) {
      alert('Passwörter stimmen nicht überein!');
    } else {
      // Registrierung absenden
    }
  }

  onForgotPassword() {
    console.log('Passwort vergessen in Registrierung geklickt');
  }
}
