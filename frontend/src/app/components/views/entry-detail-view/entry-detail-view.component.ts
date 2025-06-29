import { Component } from '@angular/core';
import {MenuBarComponent} from '../../menu-bar/menu-bar.component';
import {ShowProjectEntrysComponent} from '../../show-project-entrys/show-project-entrys.component';
import {ShowEntryDetailsComponent} from '../../show-entry-details/show-entry-details.component';

@Component({
  selector: 'app-entry-detail-view',
  imports: [
    MenuBarComponent,
    ShowProjectEntrysComponent,
    ShowEntryDetailsComponent
  ],
  templateUrl: './entry-detail-view.component.html',
  standalone: true,
  styleUrl: './entry-detail-view.component.css'
})
export class EntryDetailViewComponent {

}
