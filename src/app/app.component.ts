import {Component} from '@angular/core';
import {TaskListComponent} from "./ui/task-list/task-list.component";
import {TaskManagerComponent} from "./task-manager/task-manager.component";
import {RouterOutlet} from "@angular/router";
import {AmplifyAuthenticatorModule} from "@aws-amplify/ui-angular";
import { signOut, AuthUser, getCurrentUser } from 'aws-amplify/auth';
import {AppHeaderComponent} from "./ui/app-header/app-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    TaskListComponent,
    TaskManagerComponent,
    RouterOutlet,
    AmplifyAuthenticatorModule,
    AppHeaderComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager-frontend';
}
