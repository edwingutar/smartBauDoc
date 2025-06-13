import {Component, Input} from '@angular/core';
import {MenuBarComponent} from "../../menu-bar/menu-bar.component";
import { AddEntryComponent } from "../../add-entry/add-entry.component";
import {WindowTitleComponent} from '../../window-title/window-title.component';
import {OutputProjectComponent} from '../../output-project/output-project.component';

@Component({
  selector: 'app-entry-add-view',
  standalone: true,
  imports: [
    MenuBarComponent,
    AddEntryComponent,
    WindowTitleComponent,
    OutputProjectComponent
  ],
  templateUrl: './entry-add-view.component.html',
  styleUrl: './entry-add-view.component.css'
})
export class EntryAddViewComponent {

  @Input() titelProjekt: string = 'Projekt Name';




}
