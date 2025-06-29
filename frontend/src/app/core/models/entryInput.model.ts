import { Image } from './image.model';

export interface EntryInput {
  creatorName: string;
  calendarWeek: string;
  companyName: string;
  onSitePersonnelCount: string;
  taskDescription: string;
  notes: string;
  image: Image;
  latitude: number;
  longitude: number;
}
