import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDigitComponent } from './meter-digit.component';

describe('MeterDigitComponent', () => {
  let component: MeterDigitComponent;
  let fixture: ComponentFixture<MeterDigitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterDigitComponent]
    });
    fixture = TestBed.createComponent(MeterDigitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
