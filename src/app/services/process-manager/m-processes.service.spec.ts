import { TestBed } from '@angular/core/testing';

import { MProcessesService } from './m-processes.service';

describe('MProcessesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MProcessesService = TestBed.get(MProcessesService);
    expect(service).toBeTruthy();
  });
});
