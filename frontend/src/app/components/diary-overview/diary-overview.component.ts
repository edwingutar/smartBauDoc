import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowTitleComponent } from '../window-title/window-title.component';
import { DailyReportService, DailyReport } from '../../services/daily-report.service';
import html2pdf from 'html2pdf.js';
import { ViewChild, ElementRef } from '@angular/core';

interface CompanyEntry {
  name: string;
  strength: number;
  activity: string;
}

interface DiaryEntry {
   id: string | number;
  projectName?: string;
  date?: string;
  creator?: string;
  client?: string;
  projectAddress?: string;
  companies?: CompanyEntry[];
  weather?: string;
  calendarWeek?: string;
  arrival?: string;
  departure?: string;
  reportNumber?: string;
  notes?: string;
}

@Component({
  selector: 'app-diary-overview',
  standalone: true,
  templateUrl: './diary-overview.component.html',
  styleUrl: './diary-overview.component.css',
  imports: [
    CommonModule,
    WindowTitleComponent
  ]
})
export class DiaryOverviewComponent {
  @ViewChild('detailSection') detailSection!: ElementRef;
  diaryEntries: DiaryEntry[] = [];
  selectedEntry: DiaryEntry | null = null;

  constructor(private dailyReportService: DailyReportService) {}

get selectedEntryFields() {
   if (!this.selectedEntry) return [];

  // Adresse dynamisch mappen
  let houseNumber = '', street = '', city = '', district = '', state = '', zip = '', country = '';
  if (this.selectedEntry.projectAddress) {
    const parts = this.selectedEntry.projectAddress.split(',').map(p => p.trim());
    // Von hinten nach vorne zuweisen, damit fehlende Werte nicht alles verschieben
    if (parts.length > 0) country = parts[parts.length - 1] || '';
    if (parts.length > 1) zip = parts[parts.length - 2] || '';
    if (parts.length > 2) state = parts[parts.length - 3] || '';
    if (parts.length > 3) district = parts[parts.length - 4] || '';
    if (parts.length > 4) city = parts[parts.length - 5] || '';
    if (parts.length > 5) street = parts[parts.length - 6] || '';
    if (parts.length > 6) houseNumber = parts[parts.length - 7] || '';
  }
  const streetAndNumber = [street, houseNumber].filter(Boolean).join(' ');

  let cloud = '', temp = '', humidity = '', wind = '', rain = '';
  if (this.selectedEntry.weather) {
    const regexMap: Record<string, RegExp> = {
      cloud: /Bewölkung:\s*([^,]+)/,
      temp: /Temp(?:eratur)?:\s*([^,]+)/,
      humidity: /Feuchte:\s*([^,]+)/,
      wind: /Wind:\s*([^,]+)/,
      rain: /Niederschlag:\s*([^,]+)/,
    };
    const weather = this.selectedEntry.weather;
    cloud = (weather.match(regexMap['cloud'])?.[1] || '').trim();
    temp = (weather.match(regexMap['temp'])?.[1] || '').trim();
    humidity = (weather.match(regexMap['humidity'])?.[1] || '').trim();
    wind = (weather.match(regexMap['wind'])?.[1] || '').trim();
    rain = (weather.match(regexMap['rain'])?.[1] || '').trim();
  }
    const companies = (this.selectedEntry.companies || []).map(c => ({
    name: c.name,
    strength: c.strength,
    activity: c.activity
  }));
  return [
    { label: 'Projektname', value: this.selectedEntry.projectName },
    { label: 'Datum', value: this.selectedEntry.date },
    { label: 'KW', value: this.selectedEntry.calendarWeek },
    { label: 'Ersteller', value: this.selectedEntry.creator },
    { label: 'Berichtsnummer', value: this.selectedEntry.reportNumber },
    { label: 'Auftraggeber', value: this.selectedEntry.client },
    {
      label: 'Adresse',
      value: '',
      subfields: [
        { sublabel: 'Straße', subvalue: streetAndNumber },
      { sublabel: 'Stadt', subvalue: city },
      { sublabel: 'Landkreis', subvalue: district },
      { sublabel: 'Bundesland', subvalue: state },
      { sublabel: 'PLZ', subvalue: zip },
      { sublabel: 'Land', subvalue: country }
      ].filter(sub => sub.subvalue)
    },
{
  label: 'Anwesende Firmen',
  value: '',
  subfields: (this.selectedEntry.companies || []).flatMap(c => [
    { sublabel: 'Firmenname', subvalue: c.name },
    { sublabel: 'Mitarbeiter', subvalue: c.strength?.toString() ?? '' },
    { sublabel: 'Tätigkeit', subvalue: c.activity }
  ])
},
    {
      label: 'Wetter',
      value: '',
      subfields: [
        { sublabel: 'Bewölkung', subvalue: cloud },
        { sublabel: 'Temperatur', subvalue: temp },
        { sublabel: 'Feuchte', subvalue: humidity },
        { sublabel: 'Wind', subvalue: wind },
        { sublabel: 'Niederschlag', subvalue: rain }
      ].filter(sub => sub.subvalue)
    },
    { label: 'Ankunft', value: this.selectedEntry.arrival },
    { label: 'Verlassen', value: this.selectedEntry.departure },
    { label: 'Notiz', value: this.selectedEntry.notes }
  ];
}


  ngOnInit() {
  this.dailyReportService.getReports().subscribe({
    next: (reports) => {
      this.diaryEntries = reports.map((report, idx) => ({
          id: report.id ?? idx,
  projectName: report.projectName,
  date: report.date,
  creator: report.creator,
  client: report.client,
  projectAddress: report.projectAddress,
  weather: report.weather,
  calendarWeek: report.calendarWeek,
  arrival: report.arrival,
  departure: report.departure,
  reportNumber: report.reportNumber,
  notes: report.notes,
         companies: report.companies || []
      }));
    },
    error: (err) => console.error('Fehler beim Laden:', err)
  });
}

  exportPDF() {
    if (!this.selectedEntry) return;

      const companiesHtml = (this.selectedEntry.companies && this.selectedEntry.companies.length)
    ? `<section class="companies">
        <h2>Anwesende Firmen</h2>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th style="text-align:left;border-bottom:1px solid #bbb;">Firmenname</th>
              <th style="text-align:left;border-bottom:1px solid #bbb;">Mitarbeiter</th>
              <th style="text-align:left;border-bottom:1px solid #bbb;">Tätigkeit</th>
            </tr>
          </thead>
          <tbody>
            ${this.selectedEntry.companies.map(c => `
              <tr>
                <td style="padding:2mm 0;">${c.name}</td>
                <td style="padding:2mm 0;">${c.strength}</td>
                <td style="padding:2mm 0;">${c.activity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </section>`
    : '';

    const html = `
      <div id="pdf">
        <header>
          <h1>Bautagesbericht</h1>
          <div><b>Projekt:</b> ${this.selectedEntry.projectName || ''}</div>
          <div><b>Datum:</b> ${this.selectedEntry.date || ''}</div>
          <div><b>Ersteller:</b> ${this.selectedEntry.creator || ''}</div>
          <div><b>Auftraggeber:</b> ${this.selectedEntry.client || ''}</div>
          <div><b>Adresse:</b> ${this.selectedEntry.projectAddress || ''}</div>
          <div><b>Wetter:</b> ${this.selectedEntry.weather || ''}</div>
          <div><b>KW:</b> ${this.selectedEntry.calendarWeek || ''}</div>
          <div><b>Ankunft:</b> ${this.selectedEntry.arrival || ''}</div>
          <div><b>Verlassen:</b> ${this.selectedEntry.departure || ''}</div>
          <div><b>Berichtsnummer:</b> ${this.selectedEntry.reportNumber || ''}</div>
        </header>
        ${companiesHtml}
        <section class="notes">
          <h2>Notizen</h2>
          <div>${this.selectedEntry.notes || ''}</div>
        </section>
        <footer>
          Erzeugt am ${new Date().toLocaleDateString()}
        </footer>
      </div>
      <style>
        @page { size: A4 portrait; margin: 0; }
        body { margin: 0; padding: 0; background: white; }
        #pdf { width: 210mm; min-height: 297mm; padding: 20mm; box-sizing: border-box; font-family: Arial, sans-serif; color: #333; }
        header { border-bottom: 2px solid #004080; margin-bottom: 10mm; }
        header h1 { font-size: 24px; color: #004080; }
        section.notes { margin-top: 10mm; }
        section.notes h2 { font-size: 18px; color: #004080; }
        section.notes div { border: 1px solid #bbb; padding: 4mm; min-height: 30mm; background: #fafafa; font-size: 13px; }
        footer { margin-top: 20mm; text-align: center; font-size: 11px; color: #777; }
      </style>
    `;

    html2pdf().from(html).set({
      margin: 0,
      filename: `Bautagesbericht_${this.selectedEntry.projectName || 'Bericht'}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).save();
  }


  selectEntry(entry: DiaryEntry) {
    this.selectedEntry = entry;
    setTimeout(() => {
      this.detailSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

getCompanies(subfields: any[]): any[][] {
  // Jede Firma besteht aus 3 Subfeldern
  const result = [];
  for (let i = 0; i < subfields.length; i += 3) {
    result.push(subfields.slice(i, i + 3));
  }
  return result;
}

companyIndex(company: any[], all: any[]): number {
  // Gibt den Index der Firma zurück (für die Nummerierung)
  return Math.floor(all.indexOf(company[0]) / 3);
}

  deleteEntry(entry: DiaryEntry) {
  if (confirm('Diesen Eintrag wirklich löschen?')) {
    this.dailyReportService.deleteReport(entry.id).subscribe({
      next: () => {
        this.diaryEntries = this.diaryEntries.filter(e => e.id !== entry.id);
        if (this.selectedEntry?.id === entry.id) {
          this.selectedEntry = null;
        }
      },
      error: err => alert('Fehler beim Löschen: ' + err?.message)
    });
  }
}

}