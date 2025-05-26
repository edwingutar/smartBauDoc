import { Component, Input } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-confirm-button',
  standalone: true,
  templateUrl: './confirm-button.component.html',
  imports: [
    NgStyle
  ],
  styleUrls: ['./confirm-button.component.css']
})
export class ConfirmButtonComponent {
  @Input() title = 'ANMELDEN';
  @Input() height: string = '50px';
  @Input() minWidth: string = '325px';
  @Input() maxWidth: string = '500px';
  @Input() colorText = '#FFFFFF';
  @Input() colorBackground = '#1654F7';
  @Input() fontSizeText = '12px';
  @Input() onClick: () => void = () => {};
}
