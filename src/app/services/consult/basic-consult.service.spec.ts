import { TestBed } from '@angular/core/testing';

import { BasicConsultService } from './basic-consult.service';

describe('BasicConsultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicConsultService = TestBed.get(BasicConsultService);
    expect(service).toBeTruthy();
  });
});
