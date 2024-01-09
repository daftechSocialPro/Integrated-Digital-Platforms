import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillOfficerComponent } from './add-bill-officer.component';

describe('AddBillOfficerComponent', () => {
  let component: AddBillOfficerComponent;
  let fixture: ComponentFixture<AddBillOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBillOfficerComponent]
    });
    fixture = TestBed.createComponent(AddBillOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
