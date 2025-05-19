import { createReducer, on } from "@ngrx/store";
import * as UserActions from '../actions/user.actions';

export interface UserState {
  user: any | null;
  loading: boolean;
  error: any;
};

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);