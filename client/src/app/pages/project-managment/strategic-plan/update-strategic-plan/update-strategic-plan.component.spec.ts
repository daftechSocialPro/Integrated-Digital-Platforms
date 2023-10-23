import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStrategicPlanComponent } from './update-strategic-plan.component';

describe('UpdateStrategicPlanComponent', () => {
  let component: UpdateStrategicPlanComponent;
  let fixture: ComponentFixture<UpdateStrategicPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStrategicPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStrategicPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
