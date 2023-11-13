import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReportFormComponent } from './training-report-form.component';

describe('TrainingReportFormComponent', () => {
  let component: TrainingReportFormComponent;
  let fixture: ComponentFixture<TrainingReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingReportFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
