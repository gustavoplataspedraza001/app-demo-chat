import { TestBed } from '@angular/core/testing';

import { CoinGuard } from './coin.guard';

describe('CoinGuard', () => {
  let guard: CoinGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoinGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
