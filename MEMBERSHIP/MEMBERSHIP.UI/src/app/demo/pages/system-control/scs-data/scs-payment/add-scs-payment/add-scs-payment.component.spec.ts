import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScsPaymentComponent } from './add-scs-payment.component';

describe('AddScsPaymentComponent', () => {
  let component: AddScsPaymentComponent;
  let fixture: ComponentFixture<AddScsPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScsPaymentComponent]
    });
    fixture = TestBed.createComponent(AddScsPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
