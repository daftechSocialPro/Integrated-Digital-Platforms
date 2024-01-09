import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOfficerComponent } from './bill-officer.component';

describe('BillOfficerComponent', () => {
  let component: BillOfficerComponent;
  let fixture: ComponentFixture<BillOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillOfficerComponent]
    });
    fixture = TestBed.createComponent(BillOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
