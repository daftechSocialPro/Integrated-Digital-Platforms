import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicPlanComponent } from './strategic-plan.component';

describe('StrategicPlanComponent', () => {
  let component: StrategicPlanComponent;
  let fixture: ComponentFixture<StrategicPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategicPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
