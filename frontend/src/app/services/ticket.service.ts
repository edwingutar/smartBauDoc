import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


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

    
  apiUrl = 'http://localhost:8080/api/tickets';

  getTickets() { return this.http.get<Ticket[]>(this.apiUrl); }
  addTicket(ticket: Ticket) { return this.http.post<Ticket>(this.apiUrl, ticket); }
  markDone(id: string) { return this.http.put<Ticket>(`${this.apiUrl}/${id}/done`, {}); }
  deleteTicket(id: string) { return this.http.delete(`${this.apiUrl}/${id}`); }
  // ...
  constructor(private http: HttpClient) {}
}