import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState } from '../reducers/comment.reducer';
import { Comment } from '../../models/comment';

export const selectCommentState = createFeatureSelector<CommentState>('comments');

export const selectCommentById = (id: number) => createSelector(
  selectCommentState,
  state => state.commentsById[id] as Comment
);

export const selectCommentLoading = createSelector(
  selectCommentState,
  state => state.loading
);

export const selectCommentError = createSelector(
  selectCommentState,
  state => state.error
);