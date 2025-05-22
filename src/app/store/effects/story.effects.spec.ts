import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StoryEffects } from './story.effects';

describe('StoryEffects', () => {
  let actions$: Observable<any>;
  let effects: StoryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StoryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
