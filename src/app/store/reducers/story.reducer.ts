import { createReducer, on } from '@ngrx/store';
import * as StoryActions from '../actions/story.actions';

export interface StoryState {
  topStoryIds: number[];
  stories: { [id: number]: any };
}

export const initialState: StoryState = {
  topStoryIds: [],
  stories: {}
};

export const storyReducer = createReducer(
  initialState,
  on(StoryActions.loadTopStoriesSuccess, (state, { ids }) => ({
    ...state, topStoryIds: ids
  })),
  on(StoryActions.loadStorySuccess, (state, { story }) => ({
    ...state,
    stories: { ...state.stories, [story.id]: story }
  }))
);