import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphH1Component } from './paragraph-h1.component';

describe('ParagraphH1Component', () => {
  let component: ParagraphH1Component;
  let fixture: ComponentFixture<ParagraphH1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphH1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParagraphH1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
