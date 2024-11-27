import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchAuthSession } from "aws-amplify/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      const session = await fetchAuthSession();
      console.log("username", username);
      console.log("user id", userId);
      console.log("sign-in details", signInDetails);

      const token = session.tokens?.idToken?.toString();
      console.log('tokens',token)

    } catch (err) {
      console.log(err);
    }
  }

  async canActivate(): Promise<boolean> {
    try {
      await this.currentAuthenticatedUser();
      console.log('guard access true')
      return true;
    } catch (error) {
      this.router.navigate(['/']);
      return false;
    }
  }
}
