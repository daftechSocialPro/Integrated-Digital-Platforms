import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMeterRateComponent } from './current-meter-rate.component';

describe('CurrentMeterRateComponent', () => {
  let component: CurrentMeterRateComponent;
  let fixture: ComponentFixture<CurrentMeterRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentMeterRateComponent]
    });
    fixture = TestBed.createComponent(CurrentMeterRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
