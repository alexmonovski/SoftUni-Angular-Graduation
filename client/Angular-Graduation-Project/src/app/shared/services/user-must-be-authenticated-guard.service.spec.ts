import { TestBed } from '@angular/core/testing';

import { UserMustBeAuthenticatedGuardService } from './user-must-be-authenticated-guard.service';

describe('UserMustBeAuthenticatedGuardService', () => {
  let service: UserMustBeAuthenticatedGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMustBeAuthenticatedGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
