import {Component, Input} from '@angular/core';
import {ConfirmButtonComponent} from '../confirm-button/confirm-button.component';
import {InputFieldComponent} from '../input-field/input-field.component';
import {WindowTitleComponent} from '../window-title/window-title.component';
import {Project} from '../../models/project.model';
import {ProjectService} from '../../services/project.service';

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

  @Input() windowTitle: string = 'Projekte';
  @Input() firstPlaceholder = 'Projekt-Titel';
  @Input() secondPlaceholder = 'Details';
  @Input() thirdPlaceholder = 'Straße';
  @Input() fourthPlaceholder = 'PLZ';
  @Input() fifthPlaceholder = 'Start';
  @Input() sixthPlaceholder = 'Deadline';

  saveClick: () => void = () => {
    this.saveProject();
  };

  project: Project = {
    title: '',
    detail: '',
    street: '',
    pCode: '',
    sDate: '',
    dDate: '',
  };

  constructor(private projectService: ProjectService) {}

  saveProject() {
    this.projectService.createProject(this.project).subscribe({
      next: (res) => {
        console.log('Projekt erfolgreich gespeichert:', res);
      },
      error: (err) => {
        console.error('Fehler beim Speichern:', err);
      }
    });
  }
}
