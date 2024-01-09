import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsRateComponent } from './scs-rate.component';

describe('ScsRateComponent', () => {
  let component: ScsRateComponent;
  let fixture: ComponentFixture<ScsRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsRateComponent]
    });
    fixture = TestBed.createComponent(ScsRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
