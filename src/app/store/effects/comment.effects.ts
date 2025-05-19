import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommentService } from '../../services/comment.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CommentActions from '../actions/comment.actions';
import { Comment } from '../../models/comment';

@Injectable()
export class CommentEffects {
  private actions$ = inject(Actions);
  constructor(private commentService: CommentService) { }

  loadComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.loadComment),
      mergeMap(action =>
        this.commentService.getComment(action.id).pipe(
          map((comment: Comment) => CommentActions.loadCommentSuccess({ id: action.id, comment })),
          catchError(error => of(CommentActions.loadCommentFailure({ id: action.id, error })))
        )
      )
    ));
}