import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssReportComponent } from './css-report.component';

describe('CssReportComponent', () => {
  let component: CssReportComponent;
  let fixture: ComponentFixture<CssReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CssReportComponent]
    });
    fixture = TestBed.createComponent(CssReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
