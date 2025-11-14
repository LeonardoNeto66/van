import { Routes } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: TelaLoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'login' }
];
