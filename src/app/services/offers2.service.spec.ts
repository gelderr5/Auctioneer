import { TestBed } from '@angular/core/testing';

import { OffersService2 } from './offers2.service';

describe('OffersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OffersService2 = TestBed.get(OffersService2);
    expect(service).toBeTruthy();
  });
});
