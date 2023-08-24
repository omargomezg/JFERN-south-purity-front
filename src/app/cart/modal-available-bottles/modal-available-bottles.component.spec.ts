import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalAvailableBottlesComponent} from './modal-available-bottles.component';

describe('ModalAvailableBottlesComponent', () => {
  let component: ModalAvailableBottlesComponent;
  let fixture: ComponentFixture<ModalAvailableBottlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAvailableBottlesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalAvailableBottlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
