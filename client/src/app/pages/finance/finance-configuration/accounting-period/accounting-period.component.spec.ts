import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingPeriodComponent } from './accounting-period.component';

describe('AccountingPeriodComponent', () => {
  let component: AccountingPeriodComponent;
  let fixture: ComponentFixture<AccountingPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
