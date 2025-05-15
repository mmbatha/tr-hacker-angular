import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Story } from '../../models/story';

export const StoryActions = createActionGroup({
  source: 'Story',
  events: {
    'Load Top Stories': emptyProps(),
    'Load Top Stories Success': props<{ stories: Story[] }>(),
    'Load Top Stories Failure': props<{ error: any }>(),
    'Load Story': props<{ id: number }>(),
    'Load Story Success': props<{ story: any }>(),
    'Load Story Failure': props<{ error: any }>()
  }
});

