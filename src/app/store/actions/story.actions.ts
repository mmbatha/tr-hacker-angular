import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Story } from '../../models/story';

export const loadTopStories = createAction(
  '[Story] Load Top Stories'
);

export const loadTopStoriesSuccess = createAction('[Story] Load Top Stories Success',
  props<{ stories: Story[] }>()
);

export const loadTopStoriesFailure = createAction('[Story] Load Top Stories Failure',
  props<{ error: any }>()
);

export const loadStory = createAction(
  '[Story] Load Story',
  props<{ id: number }>()
);

export const loadStorySuccess = createAction('[Story] Load Story Success',
  props<{ story: Story }>()
);

export const loadStoryFailure = createAction('[Story] Load Story Failure',
  props<{ error: any }>()
);

