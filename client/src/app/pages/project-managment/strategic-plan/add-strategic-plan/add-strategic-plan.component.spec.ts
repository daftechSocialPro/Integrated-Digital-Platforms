import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStrategicPlanComponent } from './add-strategic-plan.component';

describe('AddStrategicPlanComponent', () => {
  let component: AddStrategicPlanComponent;
  let fixture: ComponentFixture<AddStrategicPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStrategicPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStrategicPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
