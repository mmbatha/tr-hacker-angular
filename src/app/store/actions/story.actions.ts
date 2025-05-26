import { createAction, props } from '@ngrx/store';
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

export const loadNewStories = createAction(
  '[Story] Load New Stories'
);

export const loadNewStoriesSuccess = createAction('[Story] Load New Stories Success',
  props<{ stories: Story[] }>()
);

export const loadNewStoriesFailure = createAction('[Story] Load New Stories Failure',
  props<{ error: any }>()
);

export const loadBestStories = createAction(
  '[Story] Load Best Stories'
);

export const loadBestStoriesSuccess = createAction('[Story] Load Best Stories Success',
  props<{ stories: Story[] }>()
);

export const loadBestStoriesFailure = createAction('[Story] Load Best Stories Failure',
  props<{ error: any }>()
);

export const loadStories = createAction(
  '[Story] Load Stories',
  props<{ storyType: string }>()
);

export const loadStoriesSuccess = createAction(
  '[Story] Load Stories Success',
  props<{ stories: Story[] }>()
);

export const loadStoriesFailure = createAction(
  '[Story] Load Stories Failure',
  props<{ error: any }>()
)
