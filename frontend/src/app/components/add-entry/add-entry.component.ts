import { Component } from '@angular/core';
import {WindowTitleComponent} from '../window-title/window-title.component';
import {Input} from '@angular/core';
import {InputFieldComponent} from '../input-field/input-field.component';
import {ConfirmButtonComponent} from '../confirm-button/confirm-button.component';

@Component({
  selector: 'app-add-entry',
  imports: [
    WindowTitleComponent,
    InputFieldComponent,
    ConfirmButtonComponent
  ],
  templateUrl: './add-entry.component.html',
  standalone: true,
  styleUrl: './add-entry.component.css'
})
export class AddEntryComponent {

  @Input() titelProjekt: string = 'Projekt Name';
  @Input() firstPlaceholder = 'Ersteller';
  @Input() secondPlaceholder = 'Datum';
  @Input() thirdPlaceholder = 'Kalenderwoche';
  @Input() fourthPlaceholder = 'Firma';
  @Input() fifthPlaceholder = 'Personal vor Ort';
  @Input() sixthPlaceholder = 'Aufgabe';
  @Input() seventhPlaceholder = 'Notizen';
  @Input() eighthPlaceholder = 'Temperatur';
  @Input() ninthPlaceholder = 'Windgeschwindikeit';
  @Input() tenthPlaceholder = 'Wettercode';

  saveClick: () => void = () => {
    this.saveEntry();
  };

  saveEntry() {
  }

  uploadPic(): void {
    console.log("Button funktionier!")

  }

}
