import { Component, Input } from '@angular/core';
import { Project } from '../../core/models/project.model';
import {NgStyle} from '@angular/common';


@Component({
  selector: 'app-output-project',
  imports: [
    NgStyle
  ],
  templateUrl: './output-project.component.html',
  standalone: true,
  styleUrl: './output-project.component.css'
})
export class OutputProjectComponent {
  @Input() project!: Project;

  @Input() width: string = '85vw';
  @Input() minWidth: string = '300px';
  @Input() maxWidth: string = '1000px';

  @Input() height: string = '110px';

  showInfo(): void {
    console.log("Ich bin aktiv!", this.project);
  }
}
