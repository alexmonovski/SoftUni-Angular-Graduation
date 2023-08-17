import { TestBed } from '@angular/core/testing';

import { UserMustBeAuthorGuardService } from './user-must-be-author-guard.service';

describe('UserMustBeAuthorGuardService', () => {
  let service: UserMustBeAuthorGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMustBeAuthorGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
