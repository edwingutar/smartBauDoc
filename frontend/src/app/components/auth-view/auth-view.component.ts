import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowTitleComponent } from '../window-title/window-title.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';


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
  @Input() height: string = '600px';
  @Input() maxWidth: string = '600px';
  @Input() minWidth: string = '320px';
  @Input() minHeight: string = '200px';
  @Input() maxHeight: string = '90vh';




  activeTab: 'login' | 'register' = 'login';

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
