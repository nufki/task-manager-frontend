import {Component, inject, OnInit} from '@angular/core';
import {AmplifyAuthenticatorModule} from "@aws-amplify/ui-angular";
import {getCurrentUser} from "aws-amplify/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AmplifyAuthenticatorModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  protected formFields = {
    signUp: {
      username: {
        order: 1,
        isRequired: true,
      },
      email: {
        order: 2,
        isRequired: true,
      },
      password: {
        order: 3,
        isRequired: true,
      },
    }
  };

  router = inject(Router);

  /**
   * I had to put in to re-direct to HOME in case someone directly accesses
   * the login page - a bit ugly but when working with this built in amplify
   * authenticator component I had to work with the Authenticator Hub to allow
   * re-routing. In a productive environment I would implement all methods myself
   */
  async ngOnInit() {
    try {
      const user = await getCurrentUser();
      if (user) {
        this.router.navigate(['/tasks']); // Redirect if already logged in
      }
    } catch (err) {
      console.log('Not logged in:', err);
    }
  }
}
