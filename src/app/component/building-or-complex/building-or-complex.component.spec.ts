import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingOrComplexComponent } from './building-or-complex.component';

describe('BuildingOrComplexComponent', () => {
  let component: BuildingOrComplexComponent;
  let fixture: ComponentFixture<BuildingOrComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingOrComplexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingOrComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
