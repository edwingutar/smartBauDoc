import { Component } from '@angular/core';
import {ShowProjectEntrysComponent} from '../../show-project-entrys/show-project-entrys.component';
import {MenuBarComponent} from '../../menu-bar/menu-bar.component';
import {AddEntryComponent} from '../../add-entry/add-entry.component';
import {WindowTitleComponent} from '../../window-title/window-title.component';

@Component({
  selector: 'app-project-entries-view',
  imports: [
    ShowProjectEntrysComponent,
    MenuBarComponent,
    AddEntryComponent,
    WindowTitleComponent
  ],
  templateUrl: './project-entries-view.component.html',
  standalone: true,
  styleUrl: './project-entries-view.component.css'
})
export class ProjectEntriesViewComponent {


}
