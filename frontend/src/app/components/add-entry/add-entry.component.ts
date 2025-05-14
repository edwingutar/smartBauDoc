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

  @Input() widht: string = '400px';
  @Input() height: string = '750px';

  //müssen wir noch überarbeiten, größen skallierung gehe ich später an das frisst mir grad zu viel Zeit
  @Input() widhtInput: string = '325px';
  @Input() heightInput: string = '50px';




  @Input() titelProjekt: string = 'Projekt Name';
  @Input() firstPlaceholder = 'Aufgabe';
  @Input() secondPlaceholder = 'Date';
  @Input() thirdPlaceholder = 'Erledigt von: ';
  @Input() fourthPlaceholder = 'PN. 001/005/001';
  @Input() fifthPlaceholder = 'Notizen';


  uploadPic(): void {
    console.log("Button funktionier!")

  }



}
