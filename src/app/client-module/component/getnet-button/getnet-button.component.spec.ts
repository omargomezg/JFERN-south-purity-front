import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetnetButtonComponent } from './getnet-button.component';

describe('GetnetButtonComponent', () => {
  let component: GetnetButtonComponent;
  let fixture: ComponentFixture<GetnetButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetnetButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetnetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
