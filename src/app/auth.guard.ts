import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {getCurrentUser} from 'aws-amplify/auth';
import {catchError, from, map, of} from 'rxjs';
import {NavigationRouteNames} from "./app.routes";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Wrap the promise in an observable
  return from(getCurrentUser()).pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        return router.createUrlTree([NavigationRouteNames.LOGIN]);
      }
    }),
    catchError(() => {
      return of(router.createUrlTree([NavigationRouteNames.LOGIN]));
    })
  );
};


// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   const router = inject(Router);
//
//   async currentAuthenticatedUser() {
//     try {
//       const { username, userId, signInDetails } = await getCurrentUser();
//       const session = await fetchAuthSession();
//       console.log("username", username);
//       console.log("user id", userId);
//       console.log("sign-in details", signInDetails);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//
//   async canActivate(): Promise<boolean> {
//     try {
//       await this.currentAuthenticatedUser();
//       console.log('guard access true');
//
//       return true; // Allow navigation
//     } catch (error) {
//       console.error('User not authenticated:', error);
//       this.router.navigate(['/login']); // Redirect to login if not authenticated
//       return false;
//     }
//   }
// }
