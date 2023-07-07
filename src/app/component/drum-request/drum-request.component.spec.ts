import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumRequestComponent } from './drum-request.component';

describe('DrumRequestComponent', () => {
  let component: DrumRequestComponent;
  let fixture: ComponentFixture<DrumRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrumRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrumRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
