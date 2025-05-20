import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';

// export const loadTopStories = createAction('[Story] Load Top Stories');
// export const loadTopStoriesSuccess = createAction('[Story] Load Top Stories Success', props<{ ids: number[] }>());

// export const loadStory = createAction('[Story] Load Story', props<{ id: number }>());
// export const loadStorySuccess = createAction('[Story] Load Story Success', props<{ story: any }>());

// export function loadTopStoriesFailure(arg0: { error: any; }): any {
//   console.error(arg0);
// }
// export function loadStoryFailure(arg0: { error: any; }): any {
//   console.error(arg0);
// }

export const StoryActions = createActionGroup({
  source: 'Story',
  events: {
    'Load Top Stories': emptyProps(),
    'Load Top Stories Success': props<{ ids: number[] }>(),
    'Load Top Stories Failure': props<{ error: any }>(),
    'Load Story': props<{ id: number }>(),
    'Load Story Success': props<{ story: any }>(),
    'Load Story Failure': props<{ error: any }>()
  }
});

