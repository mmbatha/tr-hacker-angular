import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducers';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUser = createSelector(
  selectUserState,
  state => state.user
);

export const selectUserLoading = createSelector(
  selectUserState,
  state => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  state => state.error
);