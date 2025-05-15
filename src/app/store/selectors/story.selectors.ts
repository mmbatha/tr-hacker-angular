import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStore from '../reducers/story.reducer';

export const selectStoryState = createFeatureSelector<fromStore.State>(
  fromStore.storeFeatureKey
);

export const selectStories = createSelector(
  selectStoryState,
  state => state.topStories
);

export const selectLoading = createSelector(
  selectStoryState,
  state => state.loading
);