import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssSetupComponent } from './css-setup.component';

describe('CssSetupComponent', () => {
  let component: CssSetupComponent;
  let fixture: ComponentFixture<CssSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CssSetupComponent]
    });
    fixture = TestBed.createComponent(CssSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
