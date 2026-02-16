import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {DrumsAvailableComponent} from './drums-available.component';
import {CommonAdminService, ProductService} from '../../core/service';
import {ToastrService} from 'ngx-toastr';
import {STATUS_BOTTLES} from '../../core/constant/app.constants';

class MockCommonAdminService {
  getOrders() {
    return of({totalElements: 0, content: []});
  }

  untakenProduct() {
    return of(true);
  }
}

class MockProductService {
  delete() {
    return of(true);
  }
}

class MockToastr {
  success() {
  }

  error() {
  }
}

describe('DrumsAvailableComponent', () => {
  let component: DrumsAvailableComponent;
  let fixture: ComponentFixture<DrumsAvailableComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(DrumsAvailableComponent, {
      set: {
        // Replace complex template that depends on Angular Material with a minimal template
        template: `<form [formGroup]="filterForm"></form>`
      }
    });

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DrumsAvailableComponent],
      providers: [
        FormBuilder,
        {provide: CommonAdminService, useClass: MockCommonAdminService},
        {provide: ProductService, useClass: MockProductService},
        {provide: ToastrService, useClass: MockToastr}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DrumsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filterForm status with STATUS_BOTTLES[0].code (empty string)', () => {
    expect(component.filterForm).toBeDefined();
    expect(component.filterForm.get('status')?.value).toBe(STATUS_BOTTLES[0].code);
  });

  it('should update selectedStatus when filterForm status changes', (done) => {
    component.filterForm.get('status')?.setValue('AVAILABLE');
    // give subscription time to process
    setTimeout(() => {
      expect(component.selectedStatus).toBe('AVAILABLE');
      done();
    }, 0);
  });
});
