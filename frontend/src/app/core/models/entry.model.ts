import {Weather} from './weather.model';
import {Image} from './image.model';

export interface Entry {
  creatorName: string;
  createdAt?: string;
  calendarWeek?: number;
  arrivalTime: string;
  departureTime: string;
  companyName: string;
  onSitePersonnelCount: number;
  taskDescription: string;
  notes: string;
  weather: Weather;
  image: Image;
}
