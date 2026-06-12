import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAdministratorComponent } from './building-administrator.component';

describe('BuildingAdministratorComponent', () => {
  let component: BuildingAdministratorComponent;
  let fixture: ComponentFixture<BuildingAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingAdministratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
