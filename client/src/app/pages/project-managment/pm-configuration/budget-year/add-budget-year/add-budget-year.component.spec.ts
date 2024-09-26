import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetYearComponent } from './add-budget-year.component';

describe('AddBudgetYearComponent', () => {
  let component: AddBudgetYearComponent;
  let fixture: ComponentFixture<AddBudgetYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBudgetYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBudgetYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
