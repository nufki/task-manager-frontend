import { Routes } from '@angular/router';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'tasks', component: TaskManagerComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskDetailsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];
