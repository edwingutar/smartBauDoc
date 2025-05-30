import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WindowTitleComponent} from '../window-title/window-title.component';
import {OutputProjectComponent} from '../output-project/output-project.component';
import {ProjectService} from '../../services/project.service';
import {Entry} from '../../core/models/entry.model';
import {Router} from '@angular/router';
import {ConfirmButtonComponent} from '../confirm-button/confirm-button.component';

@Component({
  selector: 'app-show-projects',
  imports: [
    WindowTitleComponent,
    OutputProjectComponent,
    CommonModule,
    ConfirmButtonComponent,
  ],
  templateUrl: './show-projects.component.html',
  standalone: true,
  styleUrl: './show-projects.component.css'
})
export class ShowProjectsComponent {

  @Input() titelProjekt: string = 'Projekte';
  @Input() colorButton: string = '#FAD739';
  @Input() colorText: string = '#FFFFFF'; //Eventuell hier andere Farbe

  constructor(private projectService: ProjectService, private router: Router) {}

  goToProjectAdd = () => {
    this.router.navigate(['/menuBar/addProject']);
  }


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
