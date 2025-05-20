import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStore from '../reducers/story.reducer';

export const selectStoryState = createFeatureSelector<fromStore.State>(
  fromStore.storeFeatureKey
);

export const selectStoryIds = createSelector(
  selectStoryState,
  state => state.topStoryIds
);

export const selectLoading = createSelector(
  selectStoryState,
  state => state.loading
);