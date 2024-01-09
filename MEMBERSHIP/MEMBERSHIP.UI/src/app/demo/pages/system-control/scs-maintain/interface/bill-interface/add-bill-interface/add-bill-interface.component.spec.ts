import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillInterfaceComponent } from './add-bill-interface.component';

describe('AddBillInterfaceComponent', () => {
  let component: AddBillInterfaceComponent;
  let fixture: ComponentFixture<AddBillInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBillInterfaceComponent]
    });
    fixture = TestBed.createComponent(AddBillInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
