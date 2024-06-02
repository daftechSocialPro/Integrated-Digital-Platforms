import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPaymentRequisitionComponent } from './approved-payment-requisition.component';

describe('ApprovedPaymentRequisitionComponent', () => {
  let component: ApprovedPaymentRequisitionComponent;
  let fixture: ComponentFixture<ApprovedPaymentRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedPaymentRequisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPaymentRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
