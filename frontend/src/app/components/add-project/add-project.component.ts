import {Component, Input} from '@angular/core';
import {ConfirmButtonComponent} from '../confirm-button/confirm-button.component';
import {InputFieldComponent} from '../input-field/input-field.component';
import {WindowTitleComponent} from '../window-title/window-title.component';
import {Project} from '../../core/models/project.model';
import {ProjectService} from '../../services/project.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-add-project',
  imports: [
    ConfirmButtonComponent,
    InputFieldComponent,
    WindowTitleComponent
  ],
  templateUrl: './add-project.component.html',
  standalone: true,
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  @Input() windowTitle: string = 'Projekte';
  @Input() firstPlaceholder = 'Projekt-Titel';
  @Input() secondPlaceholder = 'Details';
  @Input() thirdPlaceholder = 'Ansprechpartner';
  @Input() fourthPlaceholder = 'PLZ';
  @Input() fifthPlaceholder = 'Straße';
  @Input() sixthPlaceholder = 'Start';
  @Input() seventhPlaceholder = 'Deadline';

  saveClick: () => void = () => {
    this.saveProject();
  };

  project: Project = {
    title: '',
    detail: '',
    ansprechpartner: '',
    street: '',
    pCode: '',
    sDate: '',
    dDate: '',
    entries: [],
  };

  constructor(private projectService: ProjectService) {}

  saveProject() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
      // weitere Header hier ergänzen, falls nötig
    });

    this.projectService.createProject(this.project, headers).subscribe({
      next: (res) => {
        console.log('Projekt erfolgreich gespeichert:', res);
      },
      error: (err) => {
        console.error('Fehler beim Speichern:', err);
      }
    });
  }
}
