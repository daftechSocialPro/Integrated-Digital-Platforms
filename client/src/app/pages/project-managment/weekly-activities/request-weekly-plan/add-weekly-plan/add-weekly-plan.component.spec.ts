import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeeklyPlanComponent } from './add-weekly-plan.component';

describe('AddWeeklyPlanComponent', () => {
  let component: AddWeeklyPlanComponent;
  let fixture: ComponentFixture<AddWeeklyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWeeklyPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWeeklyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
