import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  constructor(private userService: UserService) { }

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(action =>
        this.userService.getUser(action.id).pipe(
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error => of(UserActions.loadUserFailure({ error })))
        )
      )
    ));
}