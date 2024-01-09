import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsBillSectionComponent } from './scs-bill-section.component';

describe('ScsBillSectionComponent', () => {
  let component: ScsBillSectionComponent;
  let fixture: ComponentFixture<ScsBillSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsBillSectionComponent]
    });
    fixture = TestBed.createComponent(ScsBillSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
