import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { loadMenuFailure, loadMenuSuccess, MenuActions, selectRole } from '../actions/menu.actions';
import { MenuService } from '../../services/menu.services';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MenuEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectRole),
      switchMap(({ role }) => 
        this.http.get<any[]>(`/api/config/${role}`).pipe(
          map(menuItems => loadMenuSuccess({ menuItems })),
          catchError(error => of(loadMenuFailure({ error: error.message })))
        )
      )
    )
  );
  
  loadTabs$ = createEffect(() =>
    this.actions$.pipe(
      // 1. Listen specifically for the "Load Tabs" action
      ofType(MenuActions.loadTabs),
      // 2. Use mergeMap to handle multiple unit requests in parallel
      mergeMap(({ serial }) =>
        this.menuService.getTabsForUnit(serial).pipe(
          // 3. On success, dispatch the success action
          map(tabs => MenuActions.loadTabsSuccess({ serial, tabs })),
          // 4. On error, dispatch failure so we can clear the loading state
          catchError(error => of(MenuActions.loadTabsFailure({ serial, error })))
        )
      )
    )
  );

  constructor(
    // private actions$: Actions,
    private menuService: MenuService
  ) {}
}
