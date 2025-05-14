import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-window-title',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './window-title.component.html',
  styleUrls: ['./window-title.component.css']
})
export class WindowTitleComponent {
  @Input() title: string = 'Headline';
  @Input() colorText: string = '#91A7BA';

  // Responsives Größenverhalten mit Begrenzung
  @Input() width: string = '100%';
  @Input() height: string = '600px';
  @Input() minWidth: string = '320px';
  @Input() maxWidth: string = '1800px';
  @Input() minHeight: string = '600px';
  @Input() maxHeight: string = '1000px';

  @Output() close = new EventEmitter<void>();

  private get safeHeight(): string {
    return this.height?.includes('px') || this.height?.includes('vh') ? this.height : '500px';
  }

  get topbarHeight(): string {
    return `calc(${this.safeHeight} / 8)`;
  }

  get fontSizeHeadline(): string {
    return `calc(${this.safeHeight} / 20)`;
  }

  get closeButtonFontSize(): string {
    return `calc(${this.safeHeight} / 22)`;
  }
}
