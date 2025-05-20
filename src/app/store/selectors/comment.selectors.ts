import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState } from '../reducers/comment.reducer';

export const selectCommentState = createFeatureSelector<CommentState>('comments');

export const selectComment = createSelector(
  selectCommentState,
  state => state.comment
);

export const selectCommentLoading = createSelector(
  selectCommentState,
  state => state.loading
);

export const selectCommentError = createSelector(
  selectCommentState,
  state => state.error
);