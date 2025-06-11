import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { WindowTitleComponent } from '../window-title/window-title.component'; 
import { DailyReportService, DailyReport } from '../../services/daily-report.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';




interface CompanyEntry {
  name: string;
  strength: number | null;
  activity: string;
}


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, WindowTitleComponent]
})


export class DailyReportComponent implements OnInit{
  date: string = new Date().toISOString().slice(0, 10);
  companies: CompanyEntry[] = [];
  weather: string = '';
  notes: string = '';

  @Input() titelProjekt: string = 'Projekte';
  @Input() widht: string = '400px';
  @Input() height: string = '750px';
  @Input() widhtInput: string = '325px';
  @Input() heightInput: string = '50px';


  projectName: string = '';
  projectAddress: string = '';
  client: string = '';
  creator: string = '';
  reportNumber: string = '';
  calendarWeek: string = '';
  arrival: string = '';
  departure: string = '';
  locationQuery: string = '';
  locationResults: any[] = [];
  lat: number | null = null;
  lon: number | null = null;


  newCompany: CompanyEntry = { name: '', strength: null, activity: ''};

  reportList: DailyReport[] = [];

  constructor(
    private http: HttpClient,
    private dailyReportService: DailyReportService
  ) {}

  ngOnInit() {
  this.dailyReportService.getReports().subscribe({
    next: (reports) => this.reportList = reports,
    error: (err) => console.error('Fehler:', err)
  });
}


  saveReport() {
const report: DailyReport = {
    date: this.date,
    projectName: this.projectName || '',
    projectAddress: this.projectAddress || '',
    client: this.client || '',
    creator: this.creator || '',
    reportNumber: this.reportNumber || '',
    calendarWeek: this.calendarWeek || '',
    arrival: this.arrival || '',
    departure: this.departure || '',
    companies: this.companies
      .filter(c => c.name && c.strength !== null && c.activity)
      .map(c => ({
        name: c.name,
        strength: c.strength ?? 0, // Fallback auf 0 falls leer
        activity: c.activity
      })),
    weather: this.weather || '',
    notes: this.notes || ''
   
  };
  this.dailyReportService.createReport(report).subscribe({
    next: (res) => console.log('Gespeichert:', res),
    error: (err) => console.error('Fehler:', err)
  });
}
addCompany() {
  if (
    this.newCompany.name.trim() &&
    this.newCompany.strength !== null &&
    this.newCompany.strength !== undefined &&
    this.newCompany.activity.trim()
  ) {
    this.companies.push({
      name: this.newCompany.name.trim(),
      strength: Number(this.newCompany.strength), 
      activity: this.newCompany.activity.trim()
    });
    this.newCompany = { name: '', strength: null, activity: '' };
  } else {
    alert('Bitte alle Felder für die Firma ausfüllen!');
  }
}

  removeCompany(company: CompanyEntry) {
    this.companies = this.companies.filter(c => c !== company);
  }


  searchLocation() {
  if (!this.locationQuery) return;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.locationQuery)}`;
  this.http.get<any[]>(url).subscribe(results => {
    this.locationResults = results;
  });
}

selectLocation(loc: any) {
      alert('selectLocation aufgerufen');
  this.lat = parseFloat(loc.lat);
  this.lon = parseFloat(loc.lon);
  console.log('NEUE Koordinaten:', this.lat, this.lon);
  this.locationResults = [];

  this.projectAddress = loc.display_name;
}

autoFillWeather() {

  console.log('DEBUG lat:', this.lat, 'lon:', this.lon, 'date:', this.date);
 if (this.lat === null || this.lon === null) {
  this.weather = 'Bitte zuerst einen Standort auswählen!';
  return;
}
  console.log('Wetterdaten für:', this.lat, this.lon, this.date); // <--- Debug-Ausgabe
  const date = this.date;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&hourly=temperature_2m,precipitation,cloudcover,relative_humidity_2m,windspeed_10m&start_date=${date}&end_date=${date}`;

  this.http.get<any>(url).subscribe({
    next: data => {
      
      const idx = 12;
      const temp = data.hourly?.temperature_2m?.[idx];
      const hum = data.hourly?.relative_humidity_2m?.[idx];
      const wind = data.hourly?.windspeed_10m?.[idx];
      const cloud = data.hourly?.cloudcover?.[idx];
      const precipitation = data.hourly?.precipitation?.[idx];

      this.weather = `Bewölkung: ${cloud}%, Temp: ${temp}°C, Feuchte: ${hum}%, Wind: ${wind}km/h, Niederschlag: ${precipitation}mm`;
    },
    error: err => {
      this.weather = 'Wetterdaten konnten nicht geladen werden!';
    }
  });
}

}
