import { createAction, props } from "@ngrx/store";

export const loadComment = createAction(
  '[Comment] Load Comment',
  props<{ id: number }>()
);

export const loadCommentSuccess = createAction(
  '[Comment] Load Comment Success',
  props<{ comment: any }>()
);

export const loadCommentFailure = createAction(
  '[Comment] Load Comment Failure',
  props<{ error: any }>()
);