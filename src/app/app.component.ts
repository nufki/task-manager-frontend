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
  user: AuthUser | null = null; // Stores the authenticated user details
  title = 'angular-ngrx-example';

  constructor() {
    this.checkUser(); //
  }

  async checkUser(): Promise<void> {
    try {
      this.user = await getCurrentUser();
    } catch (error) {
      console.log('No authenticated user', error);
      this.user = null;
    }
  }

  async signOut() {
    await signOut();
  }

}
