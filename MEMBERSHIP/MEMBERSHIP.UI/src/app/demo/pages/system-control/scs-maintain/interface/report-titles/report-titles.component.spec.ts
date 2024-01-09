import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTitlesComponent } from './report-titles.component';

describe('ReportTitlesComponent', () => {
  let component: ReportTitlesComponent;
  let fixture: ComponentFixture<ReportTitlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportTitlesComponent]
    });
    fixture = TestBed.createComponent(ReportTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
