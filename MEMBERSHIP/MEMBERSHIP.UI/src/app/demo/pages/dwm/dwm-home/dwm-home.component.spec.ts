import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwmHomeComponent } from './dwm-home.component';

describe('DwmHomeComponent', () => {
  let component: DwmHomeComponent;
  let fixture: ComponentFixture<DwmHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DwmHomeComponent]
    });
    fixture = TestBed.createComponent(DwmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
