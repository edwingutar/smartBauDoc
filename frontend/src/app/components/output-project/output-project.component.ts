import { Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';
import { PdfExportService } from '../../services/pdf-export.service';


@Component({
  selector: 'app-output-project',
  imports: [],
  templateUrl: './output-project.component.html',
  standalone: true,
  styleUrl: './output-project.component.css'
})
export class OutputProjectComponent {
  @Input() project!: Project;

  constructor(private pdfExportService: PdfExportService) {}

  showInfo(): void {
    console.log("Ich bin aktiv!", this.project);
  }

    downloadPdf(): void {
    this.pdfExportService.downloadPdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'export.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
