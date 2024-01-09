import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMeterTariffComponent } from './current-meter-tariff.component';

describe('CurrentMeterTariffComponent', () => {
  let component: CurrentMeterTariffComponent;
  let fixture: ComponentFixture<CurrentMeterTariffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentMeterTariffComponent]
    });
    fixture = TestBed.createComponent(CurrentMeterTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
