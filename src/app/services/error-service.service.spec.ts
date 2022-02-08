import { TestBed } from '@angular/core/testing';

import { ErrorServiceService } from './error-service.service';

describe('ErrorServiceService', () => {
  let service: ErrorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
