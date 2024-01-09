import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwmReadingSheetComponent } from './dwm-reading-sheet.component';

describe('DwmReadingSheetComponent', () => {
  let component: DwmReadingSheetComponent;
  let fixture: ComponentFixture<DwmReadingSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DwmReadingSheetComponent]
    });
    fixture = TestBed.createComponent(DwmReadingSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
