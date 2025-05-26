import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, mergeMap } from 'rxjs';
import * as CommentActions from '../actions/comment.actions';
import { CommentService } from '../../services/comment.service';

@Injectable()
export class CommentEffects {
  private actions$ = inject(Actions);
  constructor(private commentService: CommentService) { }

  loadComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.loadComment),
      mergeMap(action =>
        this.commentService.getComment(action.id).pipe(
          map(comment => CommentActions.loadCommentSuccess({ id: action.id, comment })),
          catchError(error => of(CommentActions.loadCommentFailure({ id: action.id, error })))
        )
      )
    ));
}
