import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsPaymentComponent } from './scs-payment.component';

describe('ScsPaymentComponent', () => {
  let component: ScsPaymentComponent;
  let fixture: ComponentFixture<ScsPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsPaymentComponent]
    });
    fixture = TestBed.createComponent(ScsPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
