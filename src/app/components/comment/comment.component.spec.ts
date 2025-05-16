import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryService } from "../../services/story.service";
import { CommentComponent } from './comment.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('CommentComponent', () => {
  let fixture: ComponentFixture<CommentComponent>;

  const mockService = {
    getComment: () => of({
      by: 'user123',
      time: 1600000000,
      text: '<p>test comment</p>'
    })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommentComponent],
      providers: [{ provide: StoryService, useValue: mockService },
      { provide: ActivatedRoute, useValue: { paramMap: of(new Map([['by', 'user123']])) } }]
    });

    fixture = TestBed.createComponent(CommentComponent);
    fixture.componentInstance.id = 123;
    fixture.detectChanges();
  });

  it('should render comment HTML and author', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.innerHTML).toContain('user123');
    expect(compiled.innerHTML).toContain('test comment');
  });
});
