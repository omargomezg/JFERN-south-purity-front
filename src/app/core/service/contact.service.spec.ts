import {TestBed} from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {ContactService} from './contact.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ContactService', () => {
  let service: ContactService;

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
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
