import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryComponent } from './story.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../../services/story.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('StoryComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<StoryComponent>;

  const initialState = {
    story: {},
    loading: false
  }

  const mockService = {
    getStory: () => of({
      id: 'story123',
      by: 1234,
      time: 1600000000,
      score: 2,
      title: "test title",
      url: "test url",
      descendants: 2,
      kids: [123, 456]
    }),
    getComment: () => of({
      by: 'user123',
      time: 1600000000,
      text: '<p>test comment</p>'
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryComponent],
      providers: [provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: { paramMap: of(new Map([['id', 'story123']])) } },
        { provide: StoryService, useValue: mockService }]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(StoryComponent);
    fixture.detectChanges();
  });

  it('should render story details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.innerHTML).toContain('test title');
    expect(compiled.innerHTML).toContain('test url');
  });
});
