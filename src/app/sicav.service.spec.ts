import { TestBed } from '@angular/core/testing';

import { SicavService } from './sicav.service';

describe('SicavService', () => {
  let service: SicavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SicavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
