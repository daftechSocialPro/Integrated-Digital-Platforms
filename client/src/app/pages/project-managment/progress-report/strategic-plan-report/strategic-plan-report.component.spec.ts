import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicPlanReportComponent } from './strategic-plan-report.component';

describe('StrategicPlanReportComponent', () => {
  let component: StrategicPlanReportComponent;
  let fixture: ComponentFixture<StrategicPlanReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategicPlanReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicPlanReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
