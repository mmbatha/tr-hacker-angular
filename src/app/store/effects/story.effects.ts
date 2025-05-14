import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as StoryActions from '../actions/story.actions';


@Injectable()
export class StoryEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  loadTopStories$ = createEffect(() => this.actions$.pipe(
    ofType(StoryActions.loadTopStories),
    switchMap(() =>
      this.http.get<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json').pipe(
        map(ids => StoryActions.loadTopStoriesSuccess({ ids })),
        catchError(error => of(StoryActions.loadTopStoriesFailure({ error })))
      )
    )
  ));

  loadStory$ = createEffect(() => this.actions$.pipe(
    ofType(StoryActions.loadStory),
    switchMap(action =>
      this.http.get<any>(`https://hacker-news.firebaseio.com/v0/item/${action.id}.json`).pipe(
        map(story => StoryActions.loadStorySuccess({ story })),
        catchError(error => of(StoryActions.loadStoryFailure({ error })))
      )
    )
  ));
}
