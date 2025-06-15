import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../core/models/project.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  createProject(project: Project, headers?: HttpHeaders): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project, { headers });
  }

  getProjects(headers?: HttpHeaders): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl, { headers });
  }

  addViewerToProject(
    projectId: string,
    userEmail: string,
    headers?: HttpHeaders
  ) {
    return this.http.post(
      `${this.apiUrl}/${projectId}/add-viewer`,
      { email: userEmail },
      { headers }
    );
  }
}
