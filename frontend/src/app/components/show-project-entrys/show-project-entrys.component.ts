import {Component, Input, OnInit} from '@angular/core';
import {ConfirmButtonComponent} from '../confirm-button/confirm-button.component';
import {NgForOf} from '@angular/common';
import {OutputProjectComponent} from '../output-project/output-project.component';
import {WindowTitleComponent} from '../window-title/window-title.component';
import {Entry} from '../../core/models/entry.model';
import {Router} from '@angular/router';
import {EntryService} from '../../services/entry.service';
import {OutputTaskComponent} from '../output-task/output-task.component';



@Component({
  selector: 'app-show-project-entrys',
  imports: [
    ConfirmButtonComponent,
    NgForOf,
    OutputProjectComponent,
    WindowTitleComponent,
    OutputTaskComponent
  ],
  templateUrl: './show-project-entrys.component.html',
  standalone: true,
  styleUrl: './show-project-entrys.component.css'
})
export class ShowProjectEntrysComponent implements OnInit {

  @Input() colorButton: string = '#FAD739';
  @Input() colorText: string = '#FFFFFF';

  entries: Entry[] = [];
  projectId: string | null = null;
  projectName: string = '';

  private entryService: EntryService;

  constructor(
    private router: Router,
    entryService: EntryService
  ) {
    this.entryService = entryService;
  }

  ngOnInit(): void {
    const state = history.state as { projectId?: string; projectName?: string };
    const token = localStorage.getItem('token');

    if (state?.projectId && token) {
      this.projectId = state.projectId;
      this.projectName = state.projectName ?? '';

      this.entryService.getEntries(this.projectId, token).subscribe({
        next: (data) => {
          this.entries = data;
          console.log('Einträge geladen:', data);
        },
        error: (err) => {
          console.error('Fehler beim Laden der Einträge:', err);
        }
      });
    } else {
      console.warn('projectId oder Token fehlt');
    }
  }

  addEntry(): void {
    if (this.projectId) {
      this.router.navigate(['/menuBar/addEntry'], {
        state: {
          projectId: this.projectId,
          projectName: this.projectName}
      });
    } else {
      console.warn('Keine gültige Projekt-ID vorhanden');
    }
  }

  addUser(): void {
    if (this.projectId) {
      this.router.navigate(['/menuBar/ProjectEntries/AddUser'], {
        state: { projectId: this.projectId, projectName: this.projectName }
      });
    } else {
      console.warn('Keine gültige Projekt-ID vorhanden');
    }
  }

  navigateToDetails(entry: Entry): void {
    this.router.navigate(['/menuBar/entryDetail'], {
      state: {
        entry: entry,
        entryName: entry.taskDescription,
        projectId: this.projectId,
        projectName: this.projectName
      }
    });
  }
}
