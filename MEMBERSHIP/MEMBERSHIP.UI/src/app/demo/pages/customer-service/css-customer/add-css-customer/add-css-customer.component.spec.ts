import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCssCustomerComponent } from './add-css-customer.component';

describe('AddCssCustomerComponent', () => {
  let component: AddCssCustomerComponent;
  let fixture: ComponentFixture<AddCssCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCssCustomerComponent]
    });
    fixture = TestBed.createComponent(AddCssCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
