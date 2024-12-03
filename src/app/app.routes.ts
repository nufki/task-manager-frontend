import { Route } from '@angular/router';
import { authGuard } from './auth.guard';

export enum NavigationRouteNames {
  HOME = 'tasks',
  LOGIN = 'login',
}

export const routes: Route[] = [
  {
    path: NavigationRouteNames.HOME,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./task-manager/task-manager.component').then((m) => m.TaskManagerComponent),
  },
  {
    path: `${NavigationRouteNames.HOME}/:id`,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./task-details/task-details.component').then((m) => m.TaskDetailsComponent),
  },
  {
    path: NavigationRouteNames.LOGIN,
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    redirectTo: NavigationRouteNames.HOME,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: NavigationRouteNames.LOGIN,
  },
];
