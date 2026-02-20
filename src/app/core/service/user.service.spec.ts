import {TestBed} from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {UserService} from './user.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [RouterTestingModule.withRoutes([])],
    providers: [{
            provide: ToastrService, useValue: {
                success() {
                }, error() {
                }
            }
        }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
