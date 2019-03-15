import { TestBed } from '@angular/core/testing';

import { ParcelConsultService } from './parcel-consult.service';

describe('ParcelConsultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParcelConsultService = TestBed.get(ParcelConsultService);
    expect(service).toBeTruthy();
  });
});
