import { Component } from '@angular/core';
import { MenuBarComponent } from '../../menu-bar/menu-bar.component';
import { DailyReportComponent } from '../../daily-report/daily-report.component';

@Component({
  selector: 'app-daily-report-view',
  standalone: true,
  imports: [
    MenuBarComponent,
    DailyReportComponent
  ],
  templateUrl: './daily-report-view.component.html',
  styleUrls: ['./daily-report-view.component.css']
})
export class DailyReportViewComponent {}