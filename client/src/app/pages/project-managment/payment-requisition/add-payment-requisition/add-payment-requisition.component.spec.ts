import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentRequisitionComponent } from './add-payment-requisition.component';

describe('AddPaymentRequisitionComponent', () => {
  let component: AddPaymentRequisitionComponent;
  let fixture: ComponentFixture<AddPaymentRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaymentRequisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPaymentRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
