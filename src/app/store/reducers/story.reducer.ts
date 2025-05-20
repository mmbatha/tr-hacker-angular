import { createReducer, on } from '@ngrx/store';
import * as StoryActions from '../actions/story.actions';
import { Story } from '../../models/story';

export const storeFeatureKey = 'stories';

export interface StoryState {
  topStories: Story[];
  story: any | null;
  loading: boolean;
  error: any;
}

export const initialState: StoryState = {
  topStories: [],
  story: null,
  loading: false,
  error: null
};

export const storyReducer = createReducer(
  initialState,
  on(StoryActions.loadTopStories, state => ({
    ...state,
    loading: true
  })),
  on(StoryActions.loadTopStoriesSuccess, (state, { stories }) => ({
    ...state,
    topStories: stories,
    loading: false
  })),
  on(StoryActions.loadTopStoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(StoryActions.loadStory, state => ({
    ...state,
    loading: true
  })),
  on(StoryActions.loadStorySuccess, (state, { story }) => ({
    ...state,
    story,
    loading: false
  })),
  on(StoryActions.loadStoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);