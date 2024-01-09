import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterDigitComponent } from './add-meter-digit.component';

describe('AddMeterDigitComponent', () => {
  let component: AddMeterDigitComponent;
  let fixture: ComponentFixture<AddMeterDigitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMeterDigitComponent]
    });
    fixture = TestBed.createComponent(AddMeterDigitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
