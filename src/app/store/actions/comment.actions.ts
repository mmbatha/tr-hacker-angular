import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CommentActions = createActionGroup({
  source: 'Comment',
  events: {
    'Load Comments': emptyProps(),
    
    
  }
});
