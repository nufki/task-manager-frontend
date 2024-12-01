import {inject, Injectable} from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { UserActions} from './user.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userLoadUsers),
      mergeMap(() =>
        this.userService.fetchUsers().pipe(
          tap(data => console.log('Fetched users:', data)),
          map((users) => UserActions.userLoadUsersSuccess({ users })),
          catchError((error) => of(UserActions.userLoadUsersFailure({ error: error.message })))
        )
      )
    )
  );

}
