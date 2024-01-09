import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePrefixComponent } from './invoice-prefix.component';

describe('InvoicePrefixComponent', () => {
  let component: InvoicePrefixComponent;
  let fixture: ComponentFixture<InvoicePrefixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicePrefixComponent]
    });
    fixture = TestBed.createComponent(InvoicePrefixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
