import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwmReportsComponent } from './dwm-reports.component';

describe('DwmReportsComponent', () => {
  let component: DwmReportsComponent;
  let fixture: ComponentFixture<DwmReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DwmReportsComponent]
    });
    fixture = TestBed.createComponent(DwmReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
