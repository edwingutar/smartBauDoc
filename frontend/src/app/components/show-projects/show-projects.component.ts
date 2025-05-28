import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowTitleComponent} from '../window-title/window-title.component';
import {OutputProjectComponent} from '../output-project/output-project.component';
import {Project} from '../../core/models/project.model';
import {ProjectService} from '../../services/project.service';
import {Entry} from '../../core/models/entry.model';

@Component({
  selector: 'app-show-projects',
  imports: [
    WindowTitleComponent,
    OutputProjectComponent,
    CommonModule,
  ],
  templateUrl: './show-projects.component.html',
  standalone: true,
  styleUrl: './show-projects.component.css'
})
export class ShowProjectsComponent {

  @Input() titelProjekt: string = 'Projekte';
  @Input() widht: string = '400px';
  @Input() height: string = '750px';
  @Input() widhtInput: string = '325px';
  @Input() heightInput: string = '50px';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projectList = data,
      error: (err) => console.error('Fehler beim Laden der Projekte:', err)
    });
  }


  projectList = [
    {
      title: 'Uniklinikum Augsburg',
      detail: 'Ausbau Pädiatrie',
      ansprechpartner: 'Herr Mayer',
      street: 'Stenglinstraße 2',
      pCode: '87656 Augsburg',
      sDate: '01.01.2024',
      dDate: '01.01.2025',
      entries: [] as Entry[]
    },
    {
      title: 'Rathaus Berlin',
      detail: 'Sanierung Fassade',
      ansprechpartner: 'Herr Mayer',
      street: 'Alexanderplatz 1',
      pCode: '10178 Berlin',
      sDate: '01.03.2024',
      dDate: '01.09.2025',
      entries: [] as Entry[]
    }
  ];

}
