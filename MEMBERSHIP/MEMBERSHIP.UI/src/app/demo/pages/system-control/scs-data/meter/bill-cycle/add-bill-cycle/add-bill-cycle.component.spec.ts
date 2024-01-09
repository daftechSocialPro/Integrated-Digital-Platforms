import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillCycleComponent } from './add-bill-cycle.component';

describe('AddBillCycleComponent', () => {
  let component: AddBillCycleComponent;
  let fixture: ComponentFixture<AddBillCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBillCycleComponent]
    });
    fixture = TestBed.createComponent(AddBillCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
