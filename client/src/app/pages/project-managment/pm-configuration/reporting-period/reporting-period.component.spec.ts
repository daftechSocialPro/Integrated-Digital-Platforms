import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingPeriodComponent } from './reporting-period.component';

describe('ReportingPeriodComponent', () => {
  let component: ReportingPeriodComponent;
  let fixture: ComponentFixture<ReportingPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportingPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
