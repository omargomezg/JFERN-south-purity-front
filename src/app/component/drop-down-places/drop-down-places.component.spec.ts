import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownPlacesComponent } from './drop-down-places.component';

describe('DropDownPlacesComponent', () => {
  let component: DropDownPlacesComponent;
  let fixture: ComponentFixture<DropDownPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownPlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
