import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwmQrcodeComponent } from './dwm-qrcode.component';

describe('DwmQrcodeComponent', () => {
  let component: DwmQrcodeComponent;
  let fixture: ComponentFixture<DwmQrcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DwmQrcodeComponent]
    });
    fixture = TestBed.createComponent(DwmQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
