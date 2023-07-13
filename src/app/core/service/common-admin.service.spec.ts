import { TestBed } from '@angular/core/testing';

import { CommonAdminService } from './common-admin.service';

describe('CommonService', () => {
  let service: CommonAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
