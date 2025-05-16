import { TestBed } from '@angular/core/testing';

import { StoryService } from './story.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('StoryService', () => {
  let service: StoryService;

  const mockService = {
    get: () => of({})
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockService }]
    });
    service = TestBed.inject(StoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
