import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState } from '../reducers/comment.reducer';

export const selectCommentState = createFeatureSelector<CommentState>('comments');

export const selectComment = (id: number) => createSelector(
  selectCommentState,
  state => {
    const comment = state.comment[id];
    return comment && !comment.deleted ? comment : null;
  }
);

export const selectCommentLoading = createSelector(
  selectCommentState,
  state => state.loading
);

export const selectCommentError = createSelector(
  selectCommentState,
  state => state.error
);