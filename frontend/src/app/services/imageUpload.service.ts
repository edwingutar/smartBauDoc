import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../core/models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private readonly uploadUrl = 'http://localhost:8080/api/images';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<Image> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Image>(this.uploadUrl, formData, { headers });
  }
}


