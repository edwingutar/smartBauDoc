import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WindowTitleComponent } from '../window-title/window-title.component'; 
import html2pdf from 'html2pdf.js';
import { TicketService, Ticket } from '../../services/ticket.service';

// --- KOMPONENTENKONFIGURATION ---
@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, WindowTitleComponent]
})
export class TicketOverviewComponent implements OnInit {
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

  constructor(private ticketService: TicketService) {}

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
  }

  get filteredTickets() {
    return this.tickets.filter(t => this.showDone ? t.done : !t.done);
  }

  markSelectedDone() {
    const selected = this.tickets.filter(t => t.selected && !t.done);
    selected.forEach(ticket => {
      this.ticketService.markDone(ticket.id!).subscribe(updated => {
        ticket.done = true;
        ticket.status = 'Erledigt';
        ticket.selected = false;
      });
    });
    this.allSelected = false;
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
    created: new Date().toISOString().slice(0, 10), // oder leer lassen, wenn Backend setzt
    due: this.newTicket.due
  };
  this.ticketService.addTicket(ticketToSend as Ticket).subscribe(ticket => {
    this.tickets.push(ticket);
    this.showTicketForm = false;
    this.newTicket = { shortText: '', description: '', type: '', category: '', status: 'Offen', responsible: '', due: '' };
  });
  }

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe(tickets => this.tickets = tickets);
  }
  
  exportTicketsPDF() { //Hier Projektnamen in der Pdf anbinden
  const projektname = 'Projekt XY'; 
  const datum = new Date().toLocaleDateString('de-DE');

  
  const ticketzeilen = this.tickets.map((t, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${t.shortText || ''}</td>
      <td>${t.status || ''}</td>
      <td>${t.due ? new Date(t.due).toLocaleDateString('de-DE') : ''}</td>
      <td>${t.responsible || ''}</td>
      <td>${t.description || ''}</td>
    </tr>
  `).join('');

  // HTML-Template (aus PDFTicket.html)
const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Ticketübersicht</title>
  <style>
    @page { size: A4; margin: 0; }
    html, body { margin: 0; padding: 0; background: white; font-family: "Segoe UI", Arial, sans-serif; font-size: 13px; color: #222; }
    .pdf-container {
      width: 210mm;
      min-height: 297mm;
      box-sizing: border-box;
      margin: 0 auto;
      background: #fff;
      padding: 20mm 15mm 18mm 15mm; /* Weißer Rand */
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .briefkopf {
      margin-bottom: 14mm;
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
      margin-bottom: 14mm;
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
      background: #fff;
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
    tbody tr:nth-child(even) { background-color: #f7f9fc; }
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
      position: absolute;
      bottom: 15mm;
      right: 0;
      font-size: 10px;
      color: #888;
      border-top: 1px solid #ccc;
      padding-top: 4px;
      width: calc(100% - 30mm);
      text-align: right;
      left: 15mm;
    }
  </style>
</head>
<body>
  <div class="pdf-container">
    <div class="briefkopf">
      <div class="absender">
        <strong>SmartBauDoc GmbH</strong><br>
        Musterstraße 1<br>
        86150 Augsburg<br>
        www.smartbaudoc.de
      </div>
    </div>
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
          <th>Erstellt von</th>
          <th>Beschreibung</th>
        </tr>
      </thead>
      <tbody>
        ${ticketzeilen}
      </tbody>
    </table>
    <div class="unterschrift-block">
      <div class="unterschrift-feld">Projektleitung</div>
      <div class="unterschrift-feld">Bearbeiter</div>
    </div>
    <div class="footer">
      Diese Übersicht wurde automatisch mit SmartBauDoc generiert.
    </div>
  </div>
</body>
</html>
`;
  html2pdf().from(html).set({
    margin: 0,
    filename: `Ticketübersicht_${projektname}.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).save();
}
}
