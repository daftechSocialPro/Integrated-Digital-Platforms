import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterRateComponent } from './meter-rate.component';

describe('MeterRateComponent', () => {
  let component: MeterRateComponent;
  let fixture: ComponentFixture<MeterRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterRateComponent]
    });
    fixture = TestBed.createComponent(MeterRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
