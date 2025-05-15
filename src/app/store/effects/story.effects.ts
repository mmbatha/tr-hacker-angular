import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StoryActions } from '../actions/story.actions';


@Injectable()
export class StoryEffects {
  constructor(private actions$: Actions, private http: HttpClient) {
    console.log('HTTP client injected:', this.http);
  }

  loadTopStories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoryActions.loadTopStories),
      concatMap(() =>
        this.http.get<number[]>('http://hacker-news.firebaseio.com/v0/topstories.json').pipe(
          map(ids => StoryActions.loadTopStoriesSuccess({ ids: ids.slice(0, 20) })),
          catchError(error => of(StoryActions.loadTopStoriesFailure({ error })))
        )
      )
    );
  });

  loadStory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoryActions.loadStory),
      concatMap(action =>
        this.http.get<any>(`https://hacker-news.firebaseio.com/v0/item/${action.id}.json`).pipe(
          map(story => StoryActions.loadStorySuccess({ story })),
          catchError(error => of(StoryActions.loadStoryFailure({ error })))
        )
      )
    );
  });
}
