import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPwdWithCodeComponent } from './reset-pwd-with-code.component';

describe('ResetPwdWithCodeComponent', () => {
  let component: ResetPwdWithCodeComponent;
  let fixture: ComponentFixture<ResetPwdWithCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPwdWithCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPwdWithCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
