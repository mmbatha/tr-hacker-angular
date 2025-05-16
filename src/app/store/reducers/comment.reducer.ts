import { createFeature, createReducer, on } from "@ngrx/store";
import * as CommentActions from "../actions/comment.actions";
import { Comment } from '../../models/comment';

export const commentFeatureKey = 'comment';

export interface State {
  comment: { [id: number]: any };
  loading: boolean;
  error: any;
}

export const initialState: State = {
  comment: {},
  loading: false,
  error: null
}

export const commentReducer = createReducer(
  initialState,
  on(CommentActions.loadComment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CommentActions.loadCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: {
      ...state.comment,
      comment: comment
    },
    loading: false
  })),
  on(CommentActions.loadCommentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
)

export const commentFeature = createFeature({
  name: commentFeatureKey, reducer:
  commentReducer,
});
