import { Component } from '@angular/core';
import {WindowTitleComponent} from '../window-title/window-title.component';
import {Input} from '@angular/core';
import {InputFieldComponent} from '../input-field/input-field.component';
import {ConfirmButtonComponent} from '../confirm-button/confirm-button.component';
import {EntryInput} from '../../core/models/entryInput.model';
import { ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageUploadService} from '../../services/imageUpload.service';
import {EntryService} from "../../services/entry.service";
import {WeatherService} from "../../services/weather.service";

@Component({
  selector: 'app-add-entry',
  imports: [
    WindowTitleComponent,
    InputFieldComponent,
    ConfirmButtonComponent,
    CommonModule
  ],
  templateUrl: './add-entry.component.html',
  standalone: true,
  styleUrl: './add-entry.component.css'
})
export class AddEntryComponent {

  constructor(
      private imageUploadService: ImageUploadService,
      private entryService: EntryService,
      private weatherService: WeatherService,
  ) {}

  @ViewChild('hiddenFileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  @Input() titelProjekt: string = 'Projekt Name';
  @Input() firstPlaceholder = 'Ersteller';
  @Input() secondPlaceholder = 'Datum';
  @Input() thirdPlaceholder = 'Kalenderwoche';
  @Input() fourthPlaceholder = 'Firma';
  @Input() fifthPlaceholder = 'Personal vor Ort';
  @Input() sixthPlaceholder = 'Aufgabe';
  @Input() seventhPlaceholder = 'Notizen';
  @Input() eighthPlaceholder = 'Temperatur';
  @Input() ninthPlaceholder = 'Windgeschwindikeit';
  @Input() tenthPlaceholder = 'Wettercode';

  @Input() colorButton: string = '#FAD739';
  @Input() colorText: string = '#FFFFFF';

  todayDate: string = '';

  temperatureText: string = '';
  windText: string = '';
  weatherCodeText: string = '';

  weatherPreview: {
    temperature: number;
    windSpeed: number;
    weatherCode: number;
  } | null = null;

  weatherDescriptions: { [code: number]: string } = {
    0: '☀️ Klarer Himmel',
    1: '🌤️ Überwiegend klar',
    2: '🌥️ Teilweise bewölkt',
    3: '☁️ Bedeckt',
    45: '🌫️ Nebel',
    48: '🌫️ Nebel mit Reif',
    51: '🌦️ Leichter Nieselregen',
    61: '🌧️ Leichter Regen',
    80: '🌧️ Schauerregen',
    95: '⛈️ Gewitter'
  };

  entryInput: EntryInput = {
    creatorName: '',
    calendarWeek: '',
    companyName: '',
    onSitePersonnelCount: '',
    taskDescription: '',
    notes: '',
    image: {
      fileName: '',
      url: '',
      description: ''
    },
    latitude: 0,
    longitude: 0
  };

  projectId: string | null = null;

  ngOnInit() {
    this.setLocation();
    this.getTodayInfo();

    const state = history.state as { projectId?: string };
    if (state?.projectId) {
      this.projectId = state.projectId;
      console.log("Projekt-ID empfangen:", this.projectId);
    } else {
      console.warn(" Keine Project-ID im State");
    }
  }

  setLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.entryInput.latitude = position.coords.latitude;
          this.entryInput.longitude = position.coords.longitude;

          this.weatherService.fetchWeather(this.entryInput.latitude, this.entryInput.longitude).subscribe({
            next: (weather) => {
              this.weatherPreview = weather;
              this.temperatureText = `${weather.temperature} °C`;
              this.windText = `${weather.windSpeed} km/h`;
              this.weatherCodeText =
                  this.weatherDescriptions[weather.weatherCode] ?? `Code ${weather.weatherCode}`;
            },
            error: (err) => {
              console.error('Fehler beim Abrufen der Wetterdaten:', err);
            }
          });
        },
        (err) => {
          console.error('Geolocation-Fehler:', err);
        }
    );

  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.imageUploadService.uploadImage(file).subscribe({
      next: (uploadedImage) => {
        this.entryInput.image = {
          fileName: uploadedImage.fileName,
          url: `http://localhost:8080${uploadedImage.url}`,
          description: file.name
        };
      },
      error: (err) => {
        console.error('Upload fehlgeschlagen', err);
      }
    });
  }

  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
  }


  saveClick: () => void = () => {
    this.saveEntry();
  };

  saveEntry() {
    const token = localStorage.getItem('token');
    const projectId = this.projectId;

    if (!token || !projectId) {
      console.error('Token oder Project-ID fehlen');
      return;
    }

    this.entryService.addEntry(projectId, this.entryInput, token).subscribe({
      next: (res) => {
        console.log('Eintrag erfolgreich gespeichert:', res);
      },
      error: (err) => {
        console.error('Fehler beim Speichern:', err);
      }
    });
  }


  getTodayInfo() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('de-DE');

    const getCalendarWeek = (d: Date): number => {
      const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = date.getUTCDay() || 7;
      date.setUTCDate(date.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    };

    const week = getCalendarWeek(today);

    this.todayDate = dateStr;
    this.entryInput.calendarWeek = String(week); // falls `string` im Model
  }

}
