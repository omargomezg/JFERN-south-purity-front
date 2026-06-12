import {ComponentFixture, TestBed} from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {ModalTransactionComponent} from './modal-transaction.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ModalTransactionComponent', () => {
  let component: ModalTransactionComponent;
  let fixture: ComponentFixture<ModalTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ModalTransactionComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [RouterTestingModule.withRoutes([])],
    providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
            provide: ToastrService, useValue: {
                success() {
                }, error() {
                }
            }
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(ModalTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
