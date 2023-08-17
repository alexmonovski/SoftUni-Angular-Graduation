import { TestBed } from '@angular/core/testing';

import { UserAuthorizedGuardService } from './user-authorized-guard.service';

describe('UserAuthorizedGuardService', () => {
  let service: UserAuthorizedGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthorizedGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
