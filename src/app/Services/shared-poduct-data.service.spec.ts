import { TestBed } from '@angular/core/testing';

import { SharedPoductDataService } from './shared-poduct-data.service';

describe('SharedPoductDataService', () => {
  let service: SharedPoductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPoductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
