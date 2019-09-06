import { TestBed } from '@angular/core/testing';

import { MStepsService } from './m-steps.service';

describe('MStepsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MStepsService = TestBed.get(MStepsService);
    expect(service).toBeTruthy();
  });
});
