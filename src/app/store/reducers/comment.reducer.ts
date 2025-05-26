import { createReducer, on } from '@ngrx/store';
import * as CommentActions from '../actions/comment.actions';
import { Comment } from '../../models/comment';
import { Status } from '../../models/status';

export interface CommentState {
  comment: { [id: number]: any },
  status: Status;
  error: string;
}

export const initialState: CommentState = {
  comment: {},
  status: Status.pending,
  error: ""
};

export const commentReducer = createReducer(
  initialState,
  on(CommentActions.loadComment, state => ({
    ...state,
    status: Status.loading
  })),
  on(CommentActions.loadCommentSuccess, (state, { id, comment }) => ({
    ...state,
    comment: {
      ...state.comment,
      [id]: comment
    },
    status: Status.success
  })),
  on(CommentActions.loadCommentFailure, (state, { error }) => ({
    ...state,
    status: Status.error,
    error
  }))
);

