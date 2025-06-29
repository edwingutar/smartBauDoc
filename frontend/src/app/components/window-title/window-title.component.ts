import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-window-title',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './window-title.component.html',
  styleUrls: ['./window-title.component.css']
})
export class WindowTitleComponent {
  @Input() title: string = 'Headline';
  @Input() colorText: string = '#013063';

  @Input() width: string = '95vw';
  @Input() minWidth: string = '350px'; //iPhoneSe 375
  @Input() maxWidth: string = '1200px';

  @Input() height: string = '80vh';
  @Input() minHeight: string = '500px';
  @Input() maxHeight: string = '1000px';


  @Input() topbarHeight: string = '80px';
  @Input() fontSizeHeadline: string = '25px';


}
