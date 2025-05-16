import { createAction, props } from "@ngrx/store";
import { Comment } from '../../models/comment';

export const loadComment = createAction('[Comment] Load Comment');
export const loadCommentSuccess = createAction('[Comment] Load Comment Success', props<{ comment: Comment }>);
export const loadCommentFailure = createAction('[Comment] Load Comment Failure', props<{ error: Error }>);