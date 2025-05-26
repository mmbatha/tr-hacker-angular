import { createFeature, createReducer, on } from '@ngrx/store';
import * as StoryActions from '../actions/story.actions';
import { Story } from '../../models/story';
import { Status } from '../../models/status';

export const storyFeatureKey = 'story';

export interface StoryState {
  topStories: Story[];
  bestStories: Story[];
  newStories: Story[];
  stories: Story[];
  storyType: 'top' | 'new' | 'best';
  story: Story | null;
  status: Status;
  error: string;
}

export const initialState: StoryState = {
  topStories: [],
  newStories: [],
  bestStories: [],
  stories: [],
  storyType: 'top',
  story: null,
  status: Status.pending,
  error: ''
};

export const storyReducer = createReducer(
  initialState,
  on(StoryActions.loadTopStories, state => ({
    ...state,
    status: Status.loading
  })),
  on(StoryActions.loadTopStoriesSuccess, (state, { stories }) => ({
    ...state,
    topStories: stories,
    status: Status.success
  })),
  on(StoryActions.loadTopStoriesFailure, (state, { error }) => ({
    ...state,
    status: Status.error,
    error
  })),
  on(StoryActions.loadStories, state => ({
    ...state,
    status: Status.loading
  })),
  on(StoryActions.loadStoriesSuccess, (state, { stories }) => ({
    ...state,
    stories: stories,
    status: Status.success
  })),
  on(StoryActions.loadStoriesFailure, (state, { error }) => ({
    ...state,
    status: Status.error,
    error
  })),
  on(StoryActions.loadBestStories, state => ({
    ...state,
    status: Status.loading
  })),
  on(StoryActions.loadBestStoriesSuccess, (state, { stories }) => ({
    ...state,
    topStories: stories,
    status: Status.success
  })),
  on(StoryActions.loadBestStoriesFailure, (state, { error }) => ({
    ...state,
    status: Status.error,
    error
  })),
  on(StoryActions.loadNewStories, state => ({
    ...state,
    status: Status.loading
  })),
  on(StoryActions.loadNewStoriesSuccess, (state, { stories }) => ({
    ...state,
    topStories: stories,
    status: Status.success
  })),
  on(StoryActions.loadNewStoriesFailure, (state, { error }) => ({
    ...state,
    status: Status.error,
    error
  })),
  on(StoryActions.loadStory, state => ({
    ...state,
    status: Status.loading
  })),
  on(StoryActions.loadStorySuccess, (state, { story }) => ({
    ...state,
    story,
    status: Status.success
  })),
  on(StoryActions.loadStoryFailure, (state, { error }) => ({
    ...state,
    status: Status.error,
    error
  }))
);

export const storyFeature = createFeature({
  name: storyFeatureKey,
  reducer: storyReducer,
});

