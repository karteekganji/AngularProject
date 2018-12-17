import { TestBed } from '@angular/core/testing';

import { HomeGaurdService } from './home-gaurd.service';

describe('HomeGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeGaurdService = TestBed.get(HomeGaurdService);
    expect(service).toBeTruthy();
  });
});
