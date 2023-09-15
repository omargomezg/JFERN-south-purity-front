import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdminProfileComponent } from './my-admin-profile.component';

describe('MyAdminProfileComponent', () => {
  let component: MyAdminProfileComponent;
  let fixture: ComponentFixture<MyAdminProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdminProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
