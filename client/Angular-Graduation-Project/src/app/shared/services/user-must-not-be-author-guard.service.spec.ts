import { TestBed } from '@angular/core/testing';

import { UserMustNotBeAuthorGuardService } from './user-must-not-be-author-guard.service';

describe('UserMustNotBeAuthorGuardService', () => {
  let service: UserMustNotBeAuthorGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMustNotBeAuthorGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
