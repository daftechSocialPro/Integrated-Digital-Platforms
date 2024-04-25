import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentRequisitionComponent } from './pending-payment-requisition.component';

describe('PendingPaymentRequisitionComponent', () => {
  let component: PendingPaymentRequisitionComponent;
  let fixture: ComponentFixture<PendingPaymentRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPaymentRequisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPaymentRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
