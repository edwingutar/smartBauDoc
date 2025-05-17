import { Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';


@Component({
  selector: 'app-output-project',
  imports: [],
  templateUrl: './output-project.component.html',
  standalone: true,
  styleUrl: './output-project.component.css'
})
export class OutputProjectComponent {
  @Input() project!: Project;

  showInfo(): void {
    console.log("Ich bin aktiv!", this.project);
  }
}
