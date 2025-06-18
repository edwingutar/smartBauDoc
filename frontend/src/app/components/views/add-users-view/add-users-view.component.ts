import { Component } from '@angular/core';
import { MenuBarComponent } from '../../menu-bar/menu-bar.component';
import { AddUsersComponent } from '../../add-users/add-users.component';

@Component({
  selector: 'app-add-users-view',
  standalone: true,
  imports: [
    MenuBarComponent,
    AddUsersComponent
  ],
  templateUrl: './add-users-view.component.html',
  styleUrl: './add-users-view.component.css'
})
export class AddUsersViewComponent {}
