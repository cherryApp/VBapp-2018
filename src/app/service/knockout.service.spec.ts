import { TestBed, inject } from '@angular/core/testing';

import { KnockoutService } from './knockout.service';

describe('KnockoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnockoutService]
    });
  });

  it('should be created', inject([KnockoutService], (service: KnockoutService) => {
    expect(service).toBeTruthy();
  }));
});
