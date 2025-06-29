import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Ticket {
  id?: string;
  shortText: string;
  type: string;
  category: string;
  status: string;
  description: string;
  responsible: string;
  created: string;
  due: string;
  done?: boolean;
  selected?: boolean;
}

@Injectable({ providedIn: 'root' })


export class TicketService {

    
   private apiUrl = 'http://localhost:8080/api/projects';

  getTickets() { return this.http.get<Ticket[]>(this.apiUrl); }
  addTicket(ticket: Ticket) { return this.http.post<Ticket>(this.apiUrl, ticket); }
  markDone(id: string) { return this.http.put<Ticket>(`${this.apiUrl}/${id}/done`, {}); }
  deleteTicket(id: string) { return this.http.delete(`${this.apiUrl}/${id}`); }
  // ...
  constructor(private http: HttpClient) {}

  addTicketToProject(projectId: string, ticket: Ticket) {
  return this.http.post<Ticket>(`${this.apiUrl}/${projectId}/tickets`, ticket);
  }
  getTicketsForProject(projectId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/${projectId}/tickets`);
  }
  markProjectTicketDone(projectId: string, ticketId: string) {
  return this.http.put(`${this.apiUrl}/${projectId}/tickets/${ticketId}/done`, {});
}
markProjectTicketUndone(projectId: string, ticketId: string) {
  return this.http.put(`${this.apiUrl}/${projectId}/tickets/${ticketId}/undone`, {});
}
deleteProjectTicket(projectId: string, ticketId: string) {
  return this.http.delete(`${this.apiUrl}/${projectId}/tickets/${ticketId}`);
}
}