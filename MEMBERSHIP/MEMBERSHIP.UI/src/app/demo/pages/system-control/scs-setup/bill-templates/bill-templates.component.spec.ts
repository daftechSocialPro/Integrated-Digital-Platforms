import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTemplatesComponent } from './bill-templates.component';

describe('BillTemplatesComponent', () => {
  let component: BillTemplatesComponent;
  let fixture: ComponentFixture<BillTemplatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillTemplatesComponent]
    });
    fixture = TestBed.createComponent(BillTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
