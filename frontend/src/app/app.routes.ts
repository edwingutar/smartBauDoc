import { Routes } from '@angular/router';
import { WindowTitleComponent } from './components/window-title/window-title.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ConfirmButtonComponent } from './components/confirm-button/confirm-button.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthViewComponent } from './components/auth-view/auth-view.component';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { OutputTaskComponent } from './components/output-task/output-task.component';
import { ShowProjectsComponent } from './components/show-projects/show-projects.component';
import { OutputProjectComponent} from './components/output-project/output-project.component';
import { MenuBarComponent} from "./components/menu-bar/menu-bar.component";
import { ProjectViewComponent} from "./components/views/project-view/project-view.component";
import { ProjectAddViewComponent} from "./components/views/project-add-view/project-add-view.component";
import { DailyReportComponent } from './components/daily-report/daily-report.component';
import { TicketOverviewComponent } from './components/ticket-overview/ticket-overview.component';
import { DailyReportViewComponent } from './components/views/daily-report-view/daily-report-view.component';
import { ProfilViewComponent } from './components/profil-view/profil-view.component';
import { AuthGuard } from './guards/auth.guard';
import { DiaryOverviewComponent } from './components/diary-overview/diary-overview.component';
import {ProjectEntriesViewComponent} from './components/views/project-entries-view/project-entries-view.component';
import {EntryAddViewComponent} from './components/views/entry-add-view/entry-add-view.component';
import {ShowProjectEntrysComponent} from './components/show-project-entrys/show-project-entrys.component';
import { AddUsersComponent } from './components/add-users/add-users.component';

export const routes: Routes = [
  { path: 'windowTitle', component: WindowTitleComponent},
  { path: 'InputField', component: InputFieldComponent },
  { path: 'ConfirmButton', component: ConfirmButtonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'AuthView', component: AuthViewComponent },
  { path: 'AddEntry', component: AddEntryComponent },
  { path: 'AddProject', component: AddProjectComponent },
  { path: 'OutputTask', component: OutputTaskComponent },
  { path: 'OutputProject', component: OutputProjectComponent },
  { path: 'showProjects', component: ShowProjectsComponent },
  { path: 'showEntries', component: ShowProjectEntrysComponent },
  { path: 'menuBar', component: MenuBarComponent },
  { path: 'menuBar/projectView', component: ProjectViewComponent },
  { path: 'menuBar/addProject', component: ProjectAddViewComponent },
  { path: 'menuBar/dailyReport', component: DailyReportViewComponent },
  { path: 'menuBar/addEntry', component: EntryAddViewComponent },
  { path: 'menuBar/ProjectEntries', component:  ProjectEntriesViewComponent},
  { path: 'daily-report', component: DailyReportComponent },
  { path: 'tickets', component: TicketOverviewComponent },
  { path: 'profil-view', component: ProfilViewComponent, canActivate: [AuthGuard] },
   { path: 'diary-overview', component: DiaryOverviewComponent },
   { path: 'menuBar/ProjectEntries/AddUser', component: AddUsersComponent }
];
