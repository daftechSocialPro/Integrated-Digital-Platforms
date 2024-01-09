import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsServiceChargeComponent } from './scs-service-charge.component';

describe('ScsServiceChargeComponent', () => {
  let component: ScsServiceChargeComponent;
  let fixture: ComponentFixture<ScsServiceChargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsServiceChargeComponent]
    });
    fixture = TestBed.createComponent(ScsServiceChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
