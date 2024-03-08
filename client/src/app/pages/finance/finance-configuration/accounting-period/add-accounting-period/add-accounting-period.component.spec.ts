import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountingPeriodComponent } from './add-accounting-period.component';

describe('AddAccountingPeriodComponent', () => {
  let component: AddAccountingPeriodComponent;
  let fixture: ComponentFixture<AddAccountingPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccountingPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccountingPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
