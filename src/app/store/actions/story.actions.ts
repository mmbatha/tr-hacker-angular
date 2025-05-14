import { createAction, props } from '@ngrx/store';

export const loadTopStories = createAction('[Story] Load Top Stories');
export const loadTopStoriesSuccess = createAction('[Story] Load Top Stories Success', props<{ids:number[]}>());

export const loadStory = createAction('[Story] Load Story', props<{id:number}>());
export const loadStorySuccess = createAction('[Story] Load Story Success', props<{story:any}>());

export function loadTopStoriesFailure(arg0: { error: any; }): any {
  console.error(arg0);
}
export function loadStoryFailure(arg0: { error: any; }): any {
  console.error(arg0);
}

