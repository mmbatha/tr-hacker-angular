import { createReducer, on } from "@ngrx/store";
import * as CommentActions from "../actions/comment.actions";
import { Comment } from '../../models/comment';

export interface CommentState {
  commentsById: { [id: number]: any };
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
    loading: false,
    commentsById: {
      ...state.commentsById,
      [id]: comment
    }
  })),
  on(CommentActions.loadCommentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
)
