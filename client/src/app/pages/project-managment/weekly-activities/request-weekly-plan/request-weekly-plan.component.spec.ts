import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestWeeklyPlanComponent } from './request-weekly-plan.component';

describe('RequestWeeklyPlanComponent', () => {
  let component: RequestWeeklyPlanComponent;
  let fixture: ComponentFixture<RequestWeeklyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestWeeklyPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestWeeklyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
