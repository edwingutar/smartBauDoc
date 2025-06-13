import { Component, Input } from '@angular/core';
import { Project } from '../../core/models/project.model';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-output-project',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './output-project.component.html',
  styleUrl: './output-project.component.css'
})
export class OutputProjectComponent {
  @Input() project!: Project;

  @Input() width: string = '85vw';
  @Input() minWidth: string = '300px';
  @Input() maxWidth: string = '1000px';
  @Input() height: string = '110px';

  constructor(private router: Router) {}

  showInfo(): void {
    if (this.project?.id) {
      this.router.navigate(['/menuBar/ProjectEntries'], {
        state: {
          projectId: this.project.id,
          projectName: this.project.title}
      });
      console.log("Projekt titel", this.project.title)
    } else {
      console.warn('Keine gültige Projekt-ID vorhanden');
    }
  }
}
