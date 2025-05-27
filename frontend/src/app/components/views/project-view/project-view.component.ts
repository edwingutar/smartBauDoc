import { Component } from '@angular/core';
import { MenuBarComponent } from '../../menu-bar/menu-bar.component';
import { ShowProjectsComponent } from '../../show-projects/show-projects.component';

@Component({
  selector: 'app-project-view',
  imports: [
    MenuBarComponent,
    ShowProjectsComponent
  ],
  templateUrl: './project-view.component.html',
  standalone: true,
  styleUrl: './project-view.component.css'
})
export class ProjectViewComponent {

}
