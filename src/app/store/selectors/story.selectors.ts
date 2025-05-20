import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoryState } from '../reducers/story.reducer';

export const selectStoryState = createFeatureSelector<StoryState>(
  'stories'
);

export const selectStories = createSelector(
  selectStoryState,
  state => state.topStories
);

export const selectStory = createSelector(
  selectStoryState,
  state => state.story
)

export const selectStoryLoading = createSelector(
  selectStoryState,
  state => state.loading
);

export const selectStoryError = createSelector(
  selectStoryState,
  state => state.error
)