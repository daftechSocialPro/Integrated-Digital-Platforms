import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicPeriodComponent } from './strategic-period.component';

describe('StrategicPeriodComponent', () => {
  let component: StrategicPeriodComponent;
  let fixture: ComponentFixture<StrategicPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategicPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

