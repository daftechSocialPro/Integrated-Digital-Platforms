import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterRateComponent } from './add-meter-rate.component';

describe('AddMeterRateComponent', () => {
  let component: AddMeterRateComponent;
  let fixture: ComponentFixture<AddMeterRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMeterRateComponent]
    });
    fixture = TestBed.createComponent(AddMeterRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
