import { TestBed } from '@angular/core/testing';

import { PDomainsService } from './p-domains.service';

describe('PDomainsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PDomainsService = TestBed.get(PDomainsService);
    expect(service).toBeTruthy();
  });
});
