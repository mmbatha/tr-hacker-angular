import { createFeature, createReducer, on } from '@ngrx/store';
import * as StoryActions from '../actions/story.actions';
import { Story } from '../../models/story';

export const storeFeatureKey = 'stories';

export interface State {
  topStories: Story[];
  story: { [id: number]: any };
  loading: boolean;
  error: any;
}

export const initialState: State = {
  topStories: [],
  story: {},
  loading: false,
  error: null
};

export const storyReducer = createReducer(
  initialState,
  on(StoryActions.loadTopStories, state => ({
    ...state,
    loading: true,
    error: null
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
    loading: true,
    error: null
  })),
  on(StoryActions.loadStorySuccess, (state, { story }) => ({
    ...state,
    stories: {
      ...state.story,
      story: story
    },
    loading: false
  })),
  on(StoryActions.loadStoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const storeFeature = createFeature({
  name: storeFeatureKey, reducer:
    storyReducer,
});