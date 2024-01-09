import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDutiesComponent } from './bill-duties.component';

describe('BillDutiesComponent', () => {
  let component: BillDutiesComponent;
  let fixture: ComponentFixture<BillDutiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillDutiesComponent]
    });
    fixture = TestBed.createComponent(BillDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
