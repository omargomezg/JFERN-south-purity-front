import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPaymentResultComponent } from './build-payment-result.component';

describe('BuildPaymentResultComponent', () => {
  let component: BuildPaymentResultComponent;
  let fixture: ComponentFixture<BuildPaymentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildPaymentResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildPaymentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
