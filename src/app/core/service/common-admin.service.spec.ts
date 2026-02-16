import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {CommonAdminService} from './common-admin.service';

describe('CommonService', () => {
  let service: CommonAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [{
        provide: ToastrService, useValue: {
          success() {
          }, error() {
          }
        }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(CommonAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
