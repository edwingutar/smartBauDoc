import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-output-task',
  imports: [
    NgIf
  ],
  templateUrl: './output-task.component.html',
  standalone: true,
  styleUrl: './output-task.component.css'
})
export class OutputTaskComponent {

  task = {
    title: 'Trockenbauarbeiten',
    room: 'Zimmer 030',
    pn: 'PN. 001/001/001',
    date: '01.05.2024'
  };



  showInfo(): void {
    console.log("Ich bin aktiv!")
  }

}






