import {Component, Input} from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgStyle} from '@angular/common';

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
  @Input() minWidth: string = '350px';
  @Input() maxWidth: string = '1200px';

  @Input() height: string = '75px';


}
