import { createFeature, createReducer, on } from '@ngrx/store';
import { StoryActions } from '../actions/story.actions';

export const storeFeatureKey = 'store';

export interface State {
  topStoryIds: number[];
  stories: { [id: number]: any };
}

export const initialState: State = {
  topStoryIds: [],
  stories: {}
};

export const storyReducer = createReducer(
  initialState,
  on(StoryActions.loadTopStoriesSuccess, (state, { ids }) => ({ ...state, topStoryIds: ids })),
  on(StoryActions.loadStorySuccess, (state, { story }) => ({ ...state, stories: { ...state.stories, [story.id]: story } }))
);

export const storeFeature = createFeature({
  name: storeFeatureKey, reducer:
    storyReducer,
});