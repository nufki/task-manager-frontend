import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {fetchAuthSession} from 'aws-amplify/auth';

export function jwtInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return from(fetchAuthSession()).pipe(
    mergeMap((session: any) => {
      const token = session?.tokens?.idToken;
      console.log('token: ' + token);

      // Clone the request to add the Authorization header if the token exists
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      // Pass the modified or unmodified request to the next handler
      return next(request);
    })
  );
}
