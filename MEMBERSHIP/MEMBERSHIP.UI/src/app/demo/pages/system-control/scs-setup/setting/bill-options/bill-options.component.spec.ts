import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOptionsComponent } from './bill-options.component';

describe('BillOptionsComponent', () => {
  let component: BillOptionsComponent;
  let fixture: ComponentFixture<BillOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillOptionsComponent]
    });
    fixture = TestBed.createComponent(BillOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
