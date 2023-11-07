import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportPeriodComponent } from './add-report-period.component';

describe('AddReportPeriodComponent', () => {
  let component: AddReportPeriodComponent;
  let fixture: ComponentFixture<AddReportPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReportPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReportPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
