import { TestBed } from '@angular/core/testing';

import { BusLinesService } from './bus-lines.service';

describe('BusLinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusLinesService = TestBed.get(BusLinesService);
    expect(service).toBeTruthy();
  });
});
