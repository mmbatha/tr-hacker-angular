import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromComment from '../reducers/comment.reducer';

export const selectCommentState = createFeatureSelector<fromComment.State>(
  fromComment.commentFeatureKey
);
