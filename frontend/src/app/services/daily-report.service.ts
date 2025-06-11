import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DailyReport {
  id?: string;
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
  private apiUrl = 'http://localhost:8080/api/daily-reports';

  constructor(private http: HttpClient) {}

   deleteReport(id: string | number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/daily-reports/${id}`);
  }
  getReports(): Observable<DailyReport[]> {
    return this.http.get<DailyReport[]>(this.apiUrl);
  }

  createReport(report: DailyReport): Observable<DailyReport> {
    return this.http.post<DailyReport>(this.apiUrl, report);
  }
}