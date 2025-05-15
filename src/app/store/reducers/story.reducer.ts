import { createFeature, createReducer, on } from '@ngrx/store';
import { StoryActions } from '../actions/story.actions';

export const storeFeatureKey = 'stories';

export interface State {
  topStoryIds: number[];
  stories: { [id: number]: any };
  loading: boolean;
  error: any;
}

export const initialState: State = {
  topStoryIds: [],
  stories: {},
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
  on(StoryActions.loadTopStoriesSuccess, (state, { ids }) => ({
    ...state, topStoryIds: ids,
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
      ...state.stories,
      [story.id]: story
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