import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwmMobileUsersMgmtComponent } from './dwm-mobile-users-mgmt.component';

describe('DwmMobileUsersMgmtComponent', () => {
  let component: DwmMobileUsersMgmtComponent;
  let fixture: ComponentFixture<DwmMobileUsersMgmtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DwmMobileUsersMgmtComponent]
    });
    fixture = TestBed.createComponent(DwmMobileUsersMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
