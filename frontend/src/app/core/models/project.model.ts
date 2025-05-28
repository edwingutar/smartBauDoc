import {Entry} from './entry.model';

export interface Project {
  title: string;
  detail: string;
  ansprechpartner: string,
  street: string;
  pCode: string;
  sDate: string;
  dDate: string;
  entries: Entry[];
}
