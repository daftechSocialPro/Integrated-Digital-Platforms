import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwmReaderTrackingComponent } from './dwm-reader-tracking.component';

describe('DwmReaderTrackingComponent', () => {
  let component: DwmReaderTrackingComponent;
  let fixture: ComponentFixture<DwmReaderTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DwmReaderTrackingComponent]
    });
    fixture = TestBed.createComponent(DwmReaderTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
