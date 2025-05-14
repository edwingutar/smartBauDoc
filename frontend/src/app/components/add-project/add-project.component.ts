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

  @Input() titelProjekt: string = 'Projekte';
  @Input() firstPlaceholder = 'Aufgabe';
  @Input() secondPlaceholder = 'PN';
  @Input() thirdPlaceholder = 'Adresse';
  @Input() fourthPlaceholder = 'Details';
  @Input() fifthPlaceholder = 'Ansprechpartner';
  @Input() sixthPlaceholder = 'Deadline';

  project: Project = {
    title: '',
    task: '',
    pn: '',
    address: '',
    details: '',
    contact: '',
    deadline: ''
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

  // Test
  test():void {
    console.log(this.project.task)
  }
  test2():void {
    console.log(this.project.pn)
  }
  test3():void {
    console.log(this.project.address)
  }
  test4():void {
    console.log(this.project.details)
  }
  test5():void {
    console.log(this.project.contact)
  }
  test6():void {
    console.log(this.project.deadline)
  }



}
