import { createFeature, createReducer, on } from '@ngrx/store';
import * as StoryActions from '../actions/story.actions';
import { Story } from '../../models/story';

export const storyFeatureKey = 'story';

export interface StoryState {
  topStories: Story[];
  bestStories: Story[];
  newStories: Story[];
  story: Story | null;
  status: 'pending' | 'loading' | 'error' | 'success';
  error: string;
}

export const initialState: StoryState = {
  topStories: [],
  newStories: [],
  bestStories: [],
  story: null,
  status: 'pending',
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(StoryActions.loadTopStories, state => ({
    ...state,
    status: 'loading'
  })),
  on(StoryActions.loadTopStoriesSuccess, (state, { stories }) => ({
    ...state,
    topStories: stories,
    status: 'success'
  })),
  on(StoryActions.loadTopStoriesFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error
  })),
  on(StoryActions.loadBestStories, state => ({
    ...state,
    status: 'loading'
  })),
  on(StoryActions.loadBestStoriesSuccess, (state, { stories }) => ({
    ...state,
    topStories: stories,
    status: 'success'
  })),
  on(StoryActions.loadBestStoriesFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error
  })),
  on(StoryActions.loadNewStories, state => ({
    ...state,
    status: 'loading'
  })),
  on(StoryActions.loadNewStoriesSuccess, (state, { stories }) => ({
    ...state,
    topStories: stories,
    status: 'success'
  })),
  on(StoryActions.loadNewStoriesFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error
  })),
  on(StoryActions.loadStory, state => ({
    ...state,
    status: 'pending'
  })),
  on(StoryActions.loadStorySuccess, (state, { story }) => ({
    ...state,
    story,
    status: 'success'
  })),
  on(StoryActions.loadStoryFailure, (state, { error }) => ({
    ...state,
    status: "error",
    error
  }))
);

export const storyFeature = createFeature({
  name: storyFeatureKey,
  reducer,
});

