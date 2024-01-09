import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillInterfaceComponent } from './bill-interface.component';

describe('BillInterfaceComponent', () => {
  let component: BillInterfaceComponent;
  let fixture: ComponentFixture<BillInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillInterfaceComponent]
    });
    fixture = TestBed.createComponent(BillInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
