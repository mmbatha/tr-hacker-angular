import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from "@angular/router";
import { UserComponent } from './user.component';
import { StoryService } from '../../services/story.service';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let fixture: ComponentFixture<UserComponent>;

  const mockService = {
    getUser: () => of({
      id: 'user123',
      karma: 1234,
      created: 1600000000,
      about: '<p>about me</p>'
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: StoryService, useValue: mockService },
        { provide: ActivatedRoute, useValue: { paramMap: of(new Map([['id', 'user123']])) } }
      ]
    });

    fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
  });

  it('should create and render user', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('user123');
    expect(compiled.textContent).toContain('about me');
  });
});
