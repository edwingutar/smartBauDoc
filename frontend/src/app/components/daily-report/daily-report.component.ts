import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Add this import
import { HttpClient } from '@angular/common/http';
import { WindowTitleComponent } from '../window-title/window-title.component'; // Adjust the path as needed


interface CompanyEntry {
  name: string;
  strength: number | null;
  activity: string;
  images: string[]; // Dateipfade oder Base64-Strings
}


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, WindowTitleComponent]
})
export class DailyReportComponent {
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


  newCompany: CompanyEntry = { name: '', strength: null, activity: '', images: [] };

  constructor(private http: HttpClient) {}
  addCompany() {
    this.companies.push({ ...this.newCompany, images: [] });
    this.newCompany = { name: '', strength: null, activity: '', images: [] };
  }

  removeCompany(company: CompanyEntry) {
    this.companies = this.companies.filter(c => c !== company);
  }

  addImageToCompany(company: CompanyEntry, event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        company.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
  // Optional: Setze Adresse/Feld im Formular
  this.projectAddress = loc.display_name;
}

autoFillWeather() {
  // Prüfe, ob Koordinaten gesetzt sind
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
      // Hole z.B. die Werte von 12 Uhr (Index 12)
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


  saveReport() {

    console.log({
      date: this.date,
      companies: this.companies,
      weather: this.weather,
      notes: this.notes
    });
  }
}
