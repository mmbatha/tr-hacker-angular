import { createFeature, createReducer, on } from '@ngrx/store';
import { CommentActions } from '../actions/comment.actions';

export const commentFeatureKey = 'comment';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(CommentActions.loadComments, state => state),

);

export const commentFeature = createFeature({
  name: commentFeatureKey,
  reducer,
});

