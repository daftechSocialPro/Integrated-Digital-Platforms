import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportTitlesComponent } from './add-report-titles.component';

describe('AddReportTitlesComponent', () => {
  let component: AddReportTitlesComponent;
  let fixture: ComponentFixture<AddReportTitlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReportTitlesComponent]
    });
    fixture = TestBed.createComponent(AddReportTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
