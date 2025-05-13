import { Component } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ConfirmButtonComponent } from '../confirm-button/confirm-button.component';

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

}
