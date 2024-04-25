import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRequisitionComponent } from './payment-requisition.component';

describe('PaymentRequisitionComponent', () => {
  let component: PaymentRequisitionComponent;
  let fixture: ComponentFixture<PaymentRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentRequisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
