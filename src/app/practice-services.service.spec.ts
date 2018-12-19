import { TestBed } from '@angular/core/testing';

import { PracticeServicesService } from './practice-services.service';

describe('PracticeServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PracticeServicesService = TestBed.get(PracticeServicesService);
    expect(service).toBeTruthy();
  });
});