import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ProjectService } from '../../services/project.service';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ConfirmButtonComponent } from '../confirm-button/confirm-button.component';
import { WindowTitleComponent } from '../window-title/window-title.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-users',
  standalone: true,
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
  imports: [InputFieldComponent, ConfirmButtonComponent, WindowTitleComponent]
})
export class AddUsersComponent implements OnInit {
  projectId: string = '';
  projectName: string = '';
  userEmail: string = '';
  message: string = '';
  loading: boolean = false;


  colorButton: string = '#FAD739';
  colorText: string = '#FFFFFF';
  buttonWidth: string = '90vw';
  buttonFontSize: string = '12px';
  backButtonColor: string = '#1654F7';
  backButtonTextColor: string = '#FFFFFF';

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    const state = history.state as { projectId?: string; projectName?: string };
    if (state?.projectId) {
      this.projectId = state.projectId;
      this.projectName = state.projectName ?? '';
    } else {
      this.message = 'Keine Projekt-ID gefunden!';
    }
  }

  addUser = () => {
    if (!this.userEmail.trim()) {
      this.message = 'Bitte eine E-Mail eingeben.';
      return;
    }
    this.loading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    this.projectService.addViewerToProject(this.projectId, this.userEmail, headers).subscribe({
      next: () => {
        this.message = 'User erfolgreich hinzugefügt!';
        this.userEmail = '';
        this.loading = false;
      },
      error: (err) => {
        this.message = 'Fehler: ' + (err.error?.message || err.statusText);
        this.loading = false;
      }
    });
  }

  goBack = () => {
    this.router.navigate(['/menuBar/ProjectEntries'], {
      state: { projectId: this.projectId, projectName: this.projectName }
    });
  }
}
