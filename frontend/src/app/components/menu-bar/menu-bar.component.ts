import {Component, Input} from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgStyle} from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-bar',
  imports: [
    RouterModule,
    NgStyle
  ],
  templateUrl: './menu-bar.component.html',
  standalone: true,
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {

  @Input() width: string = '90vw';
  @Input() minWidth: string = '300px';
  @Input() maxWidth: string = '1180px';
  @Input() height: string = '75px';

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

}
