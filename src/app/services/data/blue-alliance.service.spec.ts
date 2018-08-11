import { TestBed, inject } from '@angular/core/testing';

import { BlueAllianceService } from './blue-alliance.service';

describe('BlueAllianceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlueAllianceService]
    });
  });

  it('should be created', inject([BlueAllianceService], (service: BlueAllianceService) => {
    expect(service).toBeTruthy();
  }));
});
