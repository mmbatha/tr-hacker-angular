import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStory from '../reducers/story.reducer';

export const selectStoryState = createFeatureSelector<fromStory.State>(
  fromStory.storyFeatureKey
);
