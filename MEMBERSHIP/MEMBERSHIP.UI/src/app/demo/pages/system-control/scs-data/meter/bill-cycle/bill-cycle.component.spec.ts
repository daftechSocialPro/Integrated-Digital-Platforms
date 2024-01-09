import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCycleComponent } from './bill-cycle.component';

describe('BillCycleComponent', () => {
  let component: BillCycleComponent;
  let fixture: ComponentFixture<BillCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillCycleComponent]
    });
    fixture = TestBed.createComponent(BillCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
