import { Component } from '@angular/core';
import { MenuBarComponent } from '../../menu-bar/menu-bar.component';
import { DiaryOverviewComponent } from '../../diary-overview/diary-overview.component';

@Component({
  selector: 'app-diary-overview-view',
  standalone: true,
  imports: [MenuBarComponent, DiaryOverviewComponent],
  templateUrl: './diary-overview-view.component.html',
  styleUrls: ['./diary-overview-view.component.css']
})
export class DiaryOverviewViewComponent {}