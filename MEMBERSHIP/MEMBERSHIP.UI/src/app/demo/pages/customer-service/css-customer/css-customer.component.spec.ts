import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssCustomerComponent } from './css-customer.component';

describe('CssCustomerComponent', () => {
  let component: CssCustomerComponent;
  let fixture: ComponentFixture<CssCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CssCustomerComponent]
    });
    fixture = TestBed.createComponent(CssCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
