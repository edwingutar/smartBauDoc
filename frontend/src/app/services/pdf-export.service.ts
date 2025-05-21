import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PdfExportService {
  constructor(private http: HttpClient) {}

  downloadPdf() {
    return this.http.get('/api/export/pdf', { responseType: 'blob' });
  }
}