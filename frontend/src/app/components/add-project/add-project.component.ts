import {Component, Input} from '@angular/core';
import {ConfirmButtonComponent} from '../confirm-button/confirm-button.component';
import {InputFieldComponent} from '../input-field/input-field.component';
import {WindowTitleComponent} from '../window-title/window-title.component';

@Component({
  selector: 'app-add-project',
  imports: [
    ConfirmButtonComponent,
    InputFieldComponent,
    WindowTitleComponent
  ],
  templateUrl: './add-project.component.html',
  standalone: true,
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {

  @Input() widht: string = '400px';
  @Input() height: string = '750px';

  //müssen wir noch überarbeiten, größen skallierung gehe ich später an das frisst mir grad zu viel Zeit
  @Input() widhtInput: string = '325px';
  @Input() heightInput: string = '50px';

  @Input() titelProjekt: string = 'Projekte';
  @Input() firstPlaceholder = 'Aufgabe';
  @Input() secondPlaceholder = 'PN';
  @Input() thirdPlaceholder = 'Adresse';
  @Input() fourthPlaceholder = 'Details';
  @Input() fifthPlaceholder = 'Ansprechpartner';
  @Input() sixthPlaceholder = 'Deadline';

}
