import { Routes } from '@angular/router';
import { WindowTitleComponent } from './components/window-title/window-title.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ConfirmButtonComponent } from './components/confirm-button/confirm-button.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthViewComponent } from './components/auth-view/auth-view.component';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { OutputFieldComponent} from './components/output-field/output-field.component';


export const routes: Routes = [
  { path: 'windowTitle', component: WindowTitleComponent},
  { path: 'InputField', component: InputFieldComponent },
  { path: 'ConfirmButton', component: ConfirmButtonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'AuthView', component: AuthViewComponent },
  { path: 'AddEntry', component: AddEntryComponent },
  { path: 'AddProject', component: AddProjectComponent },
  { path: 'OutputField', component: OutputFieldComponent },

];
