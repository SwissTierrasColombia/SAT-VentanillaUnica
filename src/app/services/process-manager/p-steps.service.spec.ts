import { TestBed } from '@angular/core/testing';

import { PStepsService } from './p-steps.service';

describe('PStepsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PStepsService = TestBed.get(PStepsService);
    expect(service).toBeTruthy();
  });
});
