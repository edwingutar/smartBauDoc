import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DailyReport {
  id?: string;
  projectId: string;
  date: string;
  projectName: string;
  projectAddress: string;
  client: string;
  creator: string;
  reportNumber: string;
  calendarWeek: string;
  arrival: string;
  departure: string;
  companies: any[];
  weather: string;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class DailyReportService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  getReports(projectId: string): Observable<DailyReport[]> {
    return this.http.get<DailyReport[]>(`${this.apiUrl}/${projectId}/daily-reports`);
  }

  createReport(projectId: string, report: DailyReport): Observable<DailyReport> {
    return this.http.post<DailyReport>(`${this.apiUrl}/${projectId}/daily-reports`, report);
  }

  deleteReport(projectId: string, reportId: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${projectId}/daily-reports/${reportId}`);
  }
}