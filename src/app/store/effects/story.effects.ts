import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import * as StoryActions from '../actions/story.actions';
import { StoryService } from '../../services/story.service';


@Injectable()
export class StoryEffects {
  private actions$ = inject(Actions);
  constructor(private storyService: StoryService) { }

  loadTopStories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoryActions.loadTopStories),
      switchMap(() =>
        this.storyService.getTopStories().pipe(
          switchMap(ids => {
            const top20 = ids.slice(0, 20);
            const storyRequests = top20.map(id => this.storyService.getStory(id)); return forkJoin(storyRequests);
          }),
          map(stories => StoryActions.loadTopStoriesSuccess({ stories })),
          catchError(error => of(StoryActions.loadTopStoriesFailure({ error })))
        )
      )
    );
  });

  loadStory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoryActions.loadStory),
      switchMap(action =>
        this.storyService.getStory(action.id).pipe(
          map(story => StoryActions.loadStorySuccess({ story })),
          catchError(error => of(StoryActions.loadStoryFailure({ error })))
        )
      )
    )
  });
}
