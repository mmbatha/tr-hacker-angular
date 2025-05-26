import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoryState } from '../reducers/story.reducer';

export const selectStoryState = createFeatureSelector<StoryState>(
  'stories'
);

export const selectTopStories = createSelector(
  selectStoryState,
  state => state.topStories
);

export const selectNewStories = createSelector(
  selectStoryState,
  state => state.newStories
);

export const selectBestStories = createSelector(
  selectStoryState,
  state => state.bestStories
);

export const selectStories = createSelector(
  selectStoryState,
  state => state.stories
)

export const selectStory = createSelector(
  selectStoryState,
  state => state.story
)

export const selectStoryLoading = createSelector(
  selectStoryState,
  state => state.status
);

export const selectStoryError = createSelector(
  selectStoryState,
  state => state.error
)
