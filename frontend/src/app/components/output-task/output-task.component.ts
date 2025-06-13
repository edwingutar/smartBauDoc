import {Component, Input} from '@angular/core';
import {DatePipe, NgIf, NgStyle} from '@angular/common';
import {Entry} from '../../core/models/entry.model';

@Component({
  selector: 'app-output-task',
  imports: [
    NgIf,
    DatePipe,
    NgStyle
  ],
  templateUrl: './output-task.component.html',
  standalone: true,
  styleUrl: './output-task.component.css'
})
export class OutputTaskComponent {

  @Input() entry!: Entry;

  @Input() width: string = '85vw';
  @Input() minWidth: string = '300px';
  @Input() maxWidth: string = '1000px';
  @Input() height: string = '110px';

  showInfo(): void {

  }

}






