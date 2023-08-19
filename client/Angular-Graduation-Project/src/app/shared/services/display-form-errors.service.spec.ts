import { TestBed } from '@angular/core/testing';

import { DisplayFormErrorsService } from './display-form-errors.service';

describe('DisplayFormErrorsService', () => {
  let service: DisplayFormErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayFormErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
