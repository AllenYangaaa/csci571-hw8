import { TestBed, inject } from '@angular/core/testing';

import { AutoCompleteListService } from './auto-complete-list.service';

describe('AutoCompleteListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoCompleteListService]
    });
  });

  it('should be created', inject([AutoCompleteListService], (service: AutoCompleteListService) => {
    expect(service).toBeTruthy();
  }));
});
