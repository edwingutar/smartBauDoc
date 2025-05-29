import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-input-field',
  standalone: true,
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  imports: [NgStyle]
})
export class InputFieldComponent {
  private _fieldValue: string = '';
  @Output() fieldValueChange = new EventEmitter<string>();

  @Input() placeholder = 'E-Mail eingeben';
  @Input() backgroundColor = '#E6E7E9';
  @Input() type: 'text' | 'password' = 'text';

  @Input() height: string = '50px';
  @Input() width: string = '90vw';
  @Input() minWidth: string = '325px';
  @Input() maxWidth: string = '1100px';

  @Input()
  set fieldValue(val: string) {
    if (val !== this._fieldValue) {
      this._fieldValue = val;
    }
  }
  get fieldValue(): string {
    return this._fieldValue;
  }

  onUserInput(val: string) {
    this._fieldValue = val;
    this.fieldValueChange.emit(val);
  }
}
