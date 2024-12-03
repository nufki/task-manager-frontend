import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskListComponent} from "./ui/task-list/task-list.component";
import {TaskManagerComponent} from "./task-manager/task-manager.component";
import {Router, RouterOutlet} from "@angular/router";
import {AmplifyAuthenticatorModule, AuthenticatorService} from '@aws-amplify/ui-angular';
import {AppHeaderComponent} from "./ui/app-header/app-header.component";
import {NgIf} from "@angular/common";
import {Amplify} from "aws-amplify";
import outputs from '../amplifyconfiguration.json';
import {Hub} from 'aws-amplify/utils';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    TaskListComponent,
    TaskManagerComponent,
    RouterOutlet,
    AmplifyAuthenticatorModule,
    AppHeaderComponent,
    NgIf
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private hubListener: any;

  constructor(public authenticator: AuthenticatorService, private router: Router) {
    Amplify.configure(outputs);
  }

  ngOnInit(): void {
    // Listen for authentication events
    this.hubListener = Hub.listen('auth', (data) => {
      const {event} = data.payload;
      if (event === 'signedIn') {
        console.log('User signed in');
        this.router.navigate(['/tasks']); // Replace with your desired route
      } else if (event === 'signedOut') {
        console.log('User signed out');
        this.router.navigate(['/login']); // Optional: redirect to login page on sign-out
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up the Hub listener when the component is destroyed
    Hub.listen('auth', this.hubListener);
  }

}
