import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumsAvailableComponent } from './drums-available.component';

describe('DrumsAvailableComponent', () => {
  let component: DrumsAvailableComponent;
  let fixture: ComponentFixture<DrumsAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrumsAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrumsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
