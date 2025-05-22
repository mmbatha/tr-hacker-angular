import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const StoryActions = createActionGroup({
  source: 'Story',
  events: {
    'Load Storys': emptyProps(),
    
    
  }
});
