import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EntryInput} from '../core/models/entryInput.model';
import {Observable} from 'rxjs';
import {Entry} from '../core/models/entry.model';

@Injectable({ providedIn: 'root' })
export class EntryService {
  private readonly baseUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  addEntry(projectId: string, entryInput: EntryInput, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.patch(`${this.baseUrl}/${projectId}/entries`, entryInput, { headers });
  }

  getEntries(projectId: string, token: string): Observable<Entry[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Entry[]>(`http://localhost:8080/api/projects/${projectId}/entries`, { headers });
  }

}
