import { createReducer, on } from "@ngrx/store";
import * as UserActions from '../actions/user.actions';
import { Status } from '../../models/status';
import { User } from '../../models/user';

export interface UserState {
  user: User | null;
  status: Status;
  error: string;
};

export const initialState: UserState = {
  user: null,
  status: Status.pending,
  error: ""
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => ({
    ...state,
    status: Status.loading
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    status: Status.success
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    status: Status.error
  }))
);

