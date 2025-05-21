import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface WeatherHour {
  time: string;
  temperature: number | null;
  precipitation: number | null;
}

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrl: './weather-view.component.css',
  standalone: true,
   imports: [FormsModule,
    CommonModule
   ], // <--- HIER Module Importieren weil Standalone !
})
export class WeatherViewComponent {
  selectedDate: string = this.today();
  weatherData: WeatherHour[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  fetchWeather() {
    this.loading = true;
    this.error = '';
    const lat = 1.366512;
    const lon = 10.894446;
    this.http.get<any>(`/api/weather?lat=${lat}&lon=${lon}&date=${this.selectedDate}`)
      .subscribe({
        next: data => {
            console.log('Wetterdaten:', data);
          const times: string[] = data.hourly.time;
          const temps: (number|null)[] = data.hourly.temperature_2m;
          const precs: (number|null)[] = data.hourly.precipitation;
          this.weatherData = times.map((time, i) => ({
            time,
            temperature: temps[i],
            precipitation: precs[i]
          }));
          this.loading = false;
        },
        error: err => {
          this.error = 'Wetterdaten konnten nicht geladen werden.';
          this.loading = false;
        }
      });
  }
}