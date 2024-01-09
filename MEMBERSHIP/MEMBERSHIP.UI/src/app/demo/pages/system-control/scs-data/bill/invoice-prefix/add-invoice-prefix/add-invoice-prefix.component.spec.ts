import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvoicePrefixComponent } from './add-invoice-prefix.component';

describe('AddInvoicePrefixComponent', () => {
  let component: AddInvoicePrefixComponent;
  let fixture: ComponentFixture<AddInvoicePrefixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInvoicePrefixComponent]
    });
    fixture = TestBed.createComponent(AddInvoicePrefixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
