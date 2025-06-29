import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-output-button',
  standalone: true,
  templateUrl: './output-button.component.html',
  imports: [
    NgStyle
  ],
  styleUrls: ['./output-button.component.css']
})
export class OutputButtonComponent {
  @Input() title = 'ABMELDEN';
  @Input() height: string = '50px';
  @Input() width: string = '90vw';
  @Input() minWidth: string = '325px';
  @Input() maxWidth: string = '1100px';
  @Input() colorText = '#FFFFFF';
  @Input() colorBackground = '#1654F7';
  @Input() fontSizeText = '12px';
  @Output() onClick = new EventEmitter<void>();
}