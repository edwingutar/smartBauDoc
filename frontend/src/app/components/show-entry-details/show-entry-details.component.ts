import {Component, OnInit} from '@angular/core';
import {Entry} from '../../core/models/entry.model';
import {ConfirmButtonComponent} from '../confirm-button/confirm-button.component';
import {DatePipe, NgForOf, CommonModule, NgIf} from '@angular/common';
import {OutputTaskComponent} from '../output-task/output-task.component';
import {WindowTitleComponent} from '../window-title/window-title.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-entry-details',
  imports: [
    ConfirmButtonComponent,
    NgForOf,
    OutputTaskComponent,
    WindowTitleComponent,
    DatePipe,
    CommonModule,
    NgIf
  ],
  templateUrl: './show-entry-details.component.html',
  standalone: true,
  styleUrl: './show-entry-details.component.css'
})
export class ShowEntryDetailsComponent implements OnInit {


  constructor(private router: Router) {}

  entry: Entry | null = null;
  entryName: string = '';
  projectId: string = '';
  projectName: string = '';

  ngOnInit(): void {
    const state = history.state as {
      entry?: Entry;
      entryName?: string;
      projectId?: string;
      projectName?: string;
    };

    if (state.entry) {
      this.entry = state.entry;
      this.entryName = state.entryName ?? '';
      this.projectId = state.projectId ?? '';
      this.projectName = state.projectName ?? '';

      const code = this.entry?.weather?.weatherCode;
      this.weatherCodeText = this.weatherDescriptions[code ?? -1] ?? `Code ${code}`;
    } else {
      console.warn(' Kein Eintrag übergeben');
    }
  }

  test() {
    console.log(this.entry)
  }

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

  weatherCodeText: string = '';


  goBack = () => {
    this.router.navigate(['/menuBar/ProjectEntries'], {
      state: {
        projectId: this.projectId,
        projectName: this.projectName
      }
    });
  }

}



