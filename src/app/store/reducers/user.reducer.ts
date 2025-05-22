import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => state),

);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

