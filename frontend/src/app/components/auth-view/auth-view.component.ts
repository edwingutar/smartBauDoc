import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowTitleComponent } from '../window-title/window-title.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth-view',
  standalone: true,
  imports: [
    CommonModule,
    WindowTitleComponent,
    LoginComponent,
    RegisterComponent],
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.css']
})
export class AuthViewComponent {
  @Input() title: string = 'SmartBauDoc'
  @Input() width: string = '90vw';
  @Input() height: string = 'auto'; // Auto-Höhe statt fester Höhe
  @Input() maxWidth: string = '600px';
  @Input() minWidth: string = '320px';
  @Input() minHeight: string = '0'; // Minimum-Höhe auf 0 setzen
  @Input() maxHeight: string = 'none'; // Keine maximale Höhe

  activeTab: 'login' | 'register' = 'login';

  constructor(private router: Router) {}

  onLoginSuccess() {
    this.router.navigate(['menuBar/projectView']);
  }
  onRegisterSuccess() {
    this.router.navigate(['menuBar/projectView']);
  }

  loginWithApple() {
    console.log('Apple Login');
  }

  loginWithMeta() {
    console.log('Meta Login');
  }

  loginWithGoogle() {
    console.log('Google Login');
  }
}
