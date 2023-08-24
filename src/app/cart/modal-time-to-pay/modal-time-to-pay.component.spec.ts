import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTimeToPayComponent } from './modal-time-to-pay.component';

describe('ModalTimeToPayComponent', () => {
  let component: ModalTimeToPayComponent;
  let fixture: ComponentFixture<ModalTimeToPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTimeToPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTimeToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
