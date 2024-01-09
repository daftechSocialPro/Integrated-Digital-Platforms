import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillDutiesComponent } from './add-bill-duties.component';

describe('AddBillDutiesComponent', () => {
  let component: AddBillDutiesComponent;
  let fixture: ComponentFixture<AddBillDutiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBillDutiesComponent]
    });
    fixture = TestBed.createComponent(AddBillDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
