import { Component } from '@angular/core';
import { MenuBarComponent } from '../../menu-bar/menu-bar.component';
import { ProfilViewComponent } from '../../profil-view/profil-view.component';

@Component({
  selector: 'app-profil-view-view',
  standalone: true,
  imports: [
    MenuBarComponent,
    ProfilViewComponent
  ],
  templateUrl: './profil-view-view.component.html',
  styleUrl: './profil-view-view.component.css'
})
export class ProfilViewViewComponent {}