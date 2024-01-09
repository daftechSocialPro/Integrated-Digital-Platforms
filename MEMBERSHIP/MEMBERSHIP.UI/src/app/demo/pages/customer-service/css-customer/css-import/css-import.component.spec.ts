import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssImportComponent } from './css-import.component';

describe('CssImportComponent', () => {
  let component: CssImportComponent;
  let fixture: ComponentFixture<CssImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CssImportComponent]
    });
    fixture = TestBed.createComponent(CssImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
