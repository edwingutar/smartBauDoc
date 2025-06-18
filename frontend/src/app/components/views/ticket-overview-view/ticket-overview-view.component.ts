import { Component } from '@angular/core';
import { MenuBarComponent } from '../../menu-bar/menu-bar.component';
import { TicketOverviewComponent } from '../../ticket-overview/ticket-overview.component';

@Component({
  selector: 'app-ticket-overview-view',
  standalone: true,
  imports: [
    MenuBarComponent, 
    TicketOverviewComponent
  ],
  templateUrl: './ticket-overview-view.component.html',
  styleUrls: ['./ticket-overview-view.component.css']
})
export class TicketViewComponent {}