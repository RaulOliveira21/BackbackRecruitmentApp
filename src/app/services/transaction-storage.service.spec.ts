import { TestBed } from '@angular/core/testing';

import { TransactionStorageService } from './transaction-storage.service';

describe('TransactionStorageService', () => {
  let service: TransactionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
