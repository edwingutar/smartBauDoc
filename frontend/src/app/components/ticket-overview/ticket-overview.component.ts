import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ticket {
  id: string;
  shortText: string;
  description: string;
  type: string;
  category: string;
  status: string;
  created: string;
  due: string;
  responsible: string;
  selected?: boolean;
}

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TicketOverviewComponent {
  tickets: Ticket[] = [
    {
      id: 'MJ-49',
      shortText: 'Steckdose befestigen',
      description: 'Steckdose im Büro muss befestigt werden.',
      type: 'Abnahme',
      category: '-',
      status: 'Freigemeldet',
      created: '2020-09-03',
      due: '2020-09-04',
      responsible: 'Florian Ettlinger'
    },
    // ...weitere Beispiel-Tickets...
  ];

  selectedTicket: Ticket | null = null;
  allSelected = false;
  showTicketForm = false;

  newTicket: Partial<Ticket> = {
    shortText: '',
    description: '',
    type: '',
    category: '',
    status: 'Offen',
    responsible: '',
    due: ''
  };

  selectTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
  }

  toggleAll() {
    this.tickets.forEach(t => t.selected = this.allSelected);
  }

  addTicket() {
    const id = 'MJ-' + (this.tickets.length + 1);
    this.tickets.push({
      ...this.newTicket,
      id,
      created: new Date().toISOString().slice(0, 10),
      due: this.newTicket.due || '',
      status: this.newTicket.status || 'Offen',
      shortText: this.newTicket.shortText || '',
      description: this.newTicket.description || '',
      type: this.newTicket.type || '',
      category: this.newTicket.category || '',
      responsible: this.newTicket.responsible || ''
    } as Ticket);
    this.newTicket = { shortText: '', description: '', type: '', category: '', status: 'Offen', responsible: '', due: '' };
    this.showTicketForm = false;
  }

  exportSelected() {
    const selected = this.tickets.filter(t => t.selected);
    alert(`${selected.length} Tickets werden exportiert (Demo).`);
    // Hier könnte man eine Export-Funktion (z.B. PDF, Excel, etc.) anbinden.
  }
}
