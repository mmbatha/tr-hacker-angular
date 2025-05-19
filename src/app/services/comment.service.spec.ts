import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('CommentService', () => {
  let service: CommentService;

  const mockService = {
    get: () => of({})
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockService }]});
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
