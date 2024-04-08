import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReconcilliationComponent } from './account-reconcilliation.component';

describe('AccountReconcilliationComponent', () => {
  let component: AccountReconcilliationComponent;
  let fixture: ComponentFixture<AccountReconcilliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountReconcilliationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountReconcilliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
