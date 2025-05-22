import { createFeature, createReducer, on } from '@ngrx/store';
import { StoryActions } from '../actions/story.actions';

export const storyFeatureKey = 'story';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(StoryActions.loadStorys, state => state),

);

export const storyFeature = createFeature({
  name: storyFeatureKey,
  reducer,
});

