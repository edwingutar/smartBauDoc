import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Weather} from '../core/models/weather.model';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly baseUrl = 'http://localhost:8080/api/weather';

  constructor(private http: HttpClient) {}

  fetchWeather(lat: number, lon: number): Observable<Weather> {
    return this.http.get<Weather>(`${this.baseUrl}?lat=${lat}&lon=${lon}`);
  }
}
