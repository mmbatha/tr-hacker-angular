import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from "@angular/router";
import { UserComponent } from './user.component';
import { StoryService } from '../../services/story.service';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('UserComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<UserComponent>;
  const initialState = {
    user: {},
    loading: false
  };

  const mockService = {
    getUser: () => of({
      id: 'user123',
      karma: 1234,
      created: 1600000000,
      about: '<p>about me</p>'
    })
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [provideMockStore({ initialState }),
        { provide: StoryService, useValue: mockService },
        { provide: ActivatedRoute, useValue: { paramMap: of(new Map([['id', 'user123']])) } }
      ]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
  });

  it('should create and render user', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('user123');
    expect(compiled.textContent).toContain('about me');
  });
});
