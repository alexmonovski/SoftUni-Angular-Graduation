import { TestBed } from '@angular/core/testing';

import { LoginOrRegisterGuardService } from './login-or-register-guard.service';

describe('LoginOrRegisterGuardService', () => {
  let service: LoginOrRegisterGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginOrRegisterGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
