import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAdvantagesComponent } from './section-advantages.component';

describe('SectionAdvantagesComponent', () => {
  let component: SectionAdvantagesComponent;
  let fixture: ComponentFixture<SectionAdvantagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionAdvantagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionAdvantagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
