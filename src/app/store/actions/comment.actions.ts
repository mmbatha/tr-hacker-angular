import { createAction, props } from "@ngrx/store";
import { Comment } from '../../models/comment';

export const loadComment = createAction(
  '[Comment] Load Comment',
  props<{ id: number }>()
);

export const loadCommentSuccess = createAction(
  '[Comment] Load Comment Success',
  props<{ id: number, comment: Comment }>()
);

export const loadCommentFailure = createAction(
  '[Comment] Load Comment Failure',
  props<{ id: number, error: any }>()
);