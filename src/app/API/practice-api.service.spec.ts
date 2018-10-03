import { TestBed } from '@angular/core/testing';

import { PracticeApiService } from './practice-api.service';

describe('PracticeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PracticeApiService = TestBed.get(PracticeApiService);
    expect(service).toBeTruthy();
  });
});
