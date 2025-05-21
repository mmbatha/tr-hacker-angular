import { createReducer, on } from "@ngrx/store";
import * as CommentActions from "../actions/comment.actions";

export interface CommentState {
  comment: { [id: number]: any };
  loading: boolean;
  error: any;
}

export const initialState: CommentState = {
  comment: {},
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
    comment: {
      ...state.comment,
      [id]: comment
    },
    loading: false,
  })),
  on(CommentActions.loadCommentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
