import { TestBed, inject } from '@angular/core/testing';

import { StadiumService } from './stadium.service';

describe('StadiumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StadiumService]
    });
  });

  it('should be created', inject([StadiumService], (service: StadiumService) => {
    expect(service).toBeTruthy();
  }));
});
