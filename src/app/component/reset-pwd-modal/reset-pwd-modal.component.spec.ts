import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPwdModalComponent } from './reset-pwd-modal.component';

describe('ResetPwdModalComponent', () => {
  let component: ResetPwdModalComponent;
  let fixture: ComponentFixture<ResetPwdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPwdModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPwdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
