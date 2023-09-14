import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomerProfileComponent } from './my-customer-profile.component';

describe('MyCustomerProfileComponent', () => {
  let component: MyCustomerProfileComponent;
  let fixture: ComponentFixture<MyCustomerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCustomerProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCustomerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
