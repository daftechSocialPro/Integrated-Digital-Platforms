import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRequisitionViewComponent } from './payment-requisition-view.component';

describe('PaymentRequisitionViewComponent', () => {
  let component: PaymentRequisitionViewComponent;
  let fixture: ComponentFixture<PaymentRequisitionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentRequisitionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentRequisitionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
