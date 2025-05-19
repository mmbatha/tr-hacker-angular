import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;

  const mockService = {
    get: () => of({})
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockService }]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
