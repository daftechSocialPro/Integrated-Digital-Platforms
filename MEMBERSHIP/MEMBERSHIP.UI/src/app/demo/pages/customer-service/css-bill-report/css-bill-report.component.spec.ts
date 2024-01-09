import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssBillReportComponent } from './css-bill-report.component';

describe('CssBillReportComponent', () => {
  let component: CssBillReportComponent;
  let fixture: ComponentFixture<CssBillReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CssBillReportComponent]
    });
    fixture = TestBed.createComponent(CssBillReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
