import { createReducer, on } from "@ngrx/store";
import * as CommentActions from "../actions/comment.actions";
import { Comment } from '../../models/comment';

export const commentFeatureKey = 'comment';

export interface CommentState {
  commentsById: { [id: number]: Comment };
  loading: boolean;
  error: any;
}

export const initialState: CommentState = {
  commentsById: {},
  loading: false,
  error: null
}

export const commentReducer = createReducer(
  initialState,
  on(CommentActions.loadComment, state => ({
    ...state,
    loading: true
  })),
  on(CommentActions.loadCommentSuccess, (state, { id, comment }) => ({
    ...state,
    commentsById: {
      ...state.commentsById,
      [id]: comment
    },
    loading: false
  })),
  on(CommentActions.loadCommentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
)
