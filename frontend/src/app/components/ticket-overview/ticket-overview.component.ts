import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WindowTitleComponent } from '../window-title/window-title.component'; 
import html2pdf from 'html2pdf.js';
import { TicketService, Ticket } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { ConfirmButtonComponent } from '../confirm-button/confirm-button.component';


// --- KOMPONENTENKONFIGURATION ---

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, WindowTitleComponent, ConfirmButtonComponent]
})

export class TicketOverviewComponent implements OnInit {
  @ViewChild('addSection') addSection!: ElementRef;
  @ViewChild('detailSection') detailSection!: ElementRef;
    projectId: string | null = null;
  projectName: string = '';
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
 ];
  selectedTicket: Ticket | null = null;
  allSelected = false;
  showTicketForm = false;
  showDone = false;
  newTicket: Partial<Ticket> = {
    shortText: '',
    description: '',
    type: '',
    category: '',
    status: 'Offen',
    responsible: '',
    due: ''
  };

    colorButton: string = '#FAD739';
  colorText: string = '#FFFFFF';
  buttonWidth: string = '90vw';
  buttonFontSize: string = '12px';
  backButtonColor: string = '#1654F7';
  backButtonTextColor: string = '#FFFFFF';

constructor(private ticketService: TicketService, private router: Router) {}

  get selectedTicketFields() {
  if (!this.selectedTicket) return [];
  return [
    { label: 'Kurztext', value: this.selectedTicket.shortText },
    { label: 'Typ', value: this.selectedTicket.type },
    { label: 'Kategorie', value: this.selectedTicket.category },
    { label: 'Status', value: this.selectedTicket.status },
    { label: 'Beschreibung', value: this.selectedTicket.description },
    { label: 'Verantwortlicher', value: this.selectedTicket.responsible },
    { label: 'Erstellt am', value: this.selectedTicket.created ? (new Date(this.selectedTicket.created)).toLocaleDateString('de-DE') : '' },
    { label: 'Frist', value: this.selectedTicket.due ? (new Date(this.selectedTicket.due)).toLocaleDateString('de-DE') : '' }
  ];
}

  selectTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
    setTimeout(() => {
    if (this.detailSection?.nativeElement) {
      this.detailSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 0);
  }

  get filteredTickets() {
    return this.tickets.filter(t => this.showDone ? t.done : !t.done);
  }

  markSelectedDone() {
  if (this.selectedTicket && this.projectId) {
    this.ticketService.markProjectTicketDone(this.projectId, this.selectedTicket.id!).subscribe(() => {
      this.selectedTicket!.done = true;
      this.selectedTicket!.status = 'Erledigt';
      this.selectedTicket!.selected = false;
      this.allSelected = false;
      this.loadTicketsForProject(this.projectId!);
      this.router.navigate(['/menuBar/addEntry'], { state: { ticket: this.selectedTicket, projectId: this.projectId } });
      });
    }
  }


    markSelectedUndone() {
    if (this.selectedTicket && this.projectId) {
      this.ticketService.markProjectTicketUndone(this.projectId!, this.selectedTicket.id!).subscribe(() => {
        this.selectedTicket!.done = false;
        this.selectedTicket!.status = 'Offen';
        this.selectedTicket!.selected = false;
        this.allSelected = false;
        this.loadTicketsForProject(this.projectId!);
      });
    }
}

  deleteSelectedTicket() {
  if (this.selectedTicket && this.projectId) {
    this.ticketService.deleteProjectTicket(this.projectId, this.selectedTicket.id!).subscribe(() => {
      this.loadTicketsForProject(this.projectId!);
      this.selectedTicket = null;
    });
  }
}

  deleteTicket(ticket: Ticket) {
    this.ticketService.deleteTicket(ticket.id!).subscribe(() => {
      this.tickets = this.tickets.filter(t => t.id !== ticket.id);
    });
  }

  toggleAll() {
    this.tickets.forEach(t => t.selected = this.allSelected);
  }

  addTicket() {
  const ticketToSend = {
    shortText: this.newTicket.shortText,
    type: this.newTicket.type,
    category: this.newTicket.category,
    status: this.newTicket.status,
    description: this.newTicket.description,
    responsible: this.newTicket.responsible,
    created: new Date().toISOString().slice(0, 10), 
    due: this.newTicket.due
  };
  if (this.projectId) {
    this.ticketService.addTicketToProject(this.projectId, ticketToSend as Ticket).subscribe(ticket => {
       this.loadTicketsForProject(this.projectId!);
      this.showTicketForm = false;
      this.newTicket = { shortText: '', description: '', type: '', category: '', status: 'Offen', responsible: '', due: '' };
    });
  }
  }

  ngOnInit() {
  const state = history.state as { projectId?: string; projectName?: string };
    if (state?.projectId) {
      this.projectId = state.projectId;
      this.projectName = state.projectName ?? '';
      this.loadTicketsForProject(this.projectId);
    } else {
       const lastId = localStorage.getItem('lastProjectId');
    if (lastId) {
      this.projectId = lastId;
      this.loadTicketsForProject(this.projectId);
    } else {
      this.loadTickets(); // alle Tickets
    }
    }
  }

    loadTicketsForProject(projectId: string) {
    this.ticketService.getTicketsForProject(projectId).subscribe(tickets => {
      this.tickets = tickets;
      this.showDone = false;
    });
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe(tickets => this.tickets = tickets);
  }

  goBack = () => {
    this.router.navigate(['/menuBar/ProjectEntries'], {
      state: { projectId: this.projectId, projectName: this.projectName }
    });
  }
 onAddTicketClick() {
  this.showTicketForm = true;
  setTimeout(() => {
    if (this.addSection?.nativeElement) {
      this.addSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 0);
}
  
exportTicketsPDF() {
  const projektname = this.projectName;
  const datum = new Date().toLocaleDateString('de-DE');
  const ticketsProSeite = 18;
  const totalTickets = this.tickets.length;

  let tableSections = '';
  for (let i = 0; i < totalTickets; i += ticketsProSeite) {
    const chunk = this.tickets.slice(i, i + ticketsProSeite);
    const ticketRows = chunk.map((t, idx) => `
      <tr>
        <td>${i + idx + 1}</td>
        <td>${t.shortText || ''}</td>
        <td>${t.status || ''}</td>
        <td>${t.due ? new Date(t.due).toLocaleDateString('de-DE') : ''}</td>
        <td>${t.responsible || ''}</td>
        <td>${t.description || ''}</td>
      </tr>
    `).join('');

    tableSections += `
      <h1>Ticketübersicht</h1>
      <div class="info-section">
        <div class="entry"><span class="label">Projekt:</span> ${projektname}</div>
        <div class="entry"><span class="label">Erstellt:</span> ${datum}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Titel</th>
            <th>Status</th>
            <th>Frist</th>
            <th>Verantwortlicher</th>
            <th>Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          ${ticketRows}
        </tbody>
      </table>
      ${i + ticketsProSeite < totalTickets ? '<div style="page-break-after: always;"></div>' : ''}
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <style>
        @page {
          size: A4;
          margin: 25mm 15mm 25mm 15mm;
        }
        html, body {
          margin: 0;
          padding: 0;
          background: white;
          font-family: "Segoe UI", Arial, sans-serif;
          font-size: 13px;
          color: #222;
        }
        .absender {
          font-size: 12px;
          color: #004080;
          line-height: 1.5;
          margin-bottom: 8mm;
        }
        h1 {
          text-align: center;
          font-size: 22pt;
          color: #004080;
          margin-bottom: 12mm;
          border-bottom: 1px solid #ccc;
          padding-bottom: 4mm;
        }
        .info-section {
          background-color: #f3f6fa;
          border: 1px solid #cbd3db;
          border-radius: 6px;
          padding: 12px 18px;
          margin-bottom: 14mm;
          max-width: 120mm;
          margin-left: auto;
          margin-right: auto;
        }
        .entry { margin-bottom: 5px; }
        .label { font-weight: bold; color: #004080; display: inline-block; width: 120px; }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20mm;
        }
        th {
          background-color: #004080;
          color: white;
          padding: 8px 6px;
          font-size: 12px;
          text-align: left;
        }
        td {
          border: 1px solid #ccc;
          padding: 6px;
          font-size: 12px;
        }
        tbody tr:nth-child(even) {
          background-color: #f7f9fc;
        }
        .unterschrift-block {
          margin-top: 25mm;
          display: flex;
          justify-content: space-between;
        }
        .unterschrift-feld {
          width: 40%;
          border-top: 1px solid #000;
          text-align: center;
          padding-top: 5mm;
          font-size: 11px;
        }
        .footer {
          font-size: 10px;
          color: #888;
          border-top: 1px solid #ccc;
          padding-top: 4px;
          margin-top: 20mm;
          text-align: right;
        }
      </style>
    </head>
    <body>
      <div class="absender">
        <strong>SmartBauDoc GmbH</strong><br>
        Musterstraße 1<br>
        86150 Augsburg<br>
        www.smartbaudoc.de
      </div>

      ${tableSections}

      <div class="unterschrift-block">
        <div class="unterschrift-feld">Projektleitung</div>
        <div class="unterschrift-feld">Bearbeiter</div>
      </div>
    </body>
    </html>
  `;

  html2pdf().from(html).set({
    margin: [15, 15, 15, 15],
    filename: `Ticketübersicht_${projektname}.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).save();
}

}
