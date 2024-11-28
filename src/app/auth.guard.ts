import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  private async fetchAuthenticatedUserDetails(): Promise<void> {
    const user = await getCurrentUser();
    const session = await fetchAuthSession();

    console.log("Username:", user.username);
    console.log("User ID:", user.userId);
    console.log("Sign-in Details:", user.signInDetails);
  }

  async canActivate(): Promise<boolean> {
    try {
      await this.fetchAuthenticatedUserDetails();
      console.log("Guard access granted");
      return true;
    } catch (error) {
      console.error("Authentication failed:", error);
      this.router.navigate(['/']);
      return false;
    }
  }
}

