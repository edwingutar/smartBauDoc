import { Component } from '@angular/core';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-project-add-view',
  imports: [
    MenuBarComponent,
    AddProjectComponent
  ],
  templateUrl: './project-add-view.component.html',
  standalone: true,
  styleUrl: './project-add-view.component.css'
})
export class ProjectAddViewComponent {

}
