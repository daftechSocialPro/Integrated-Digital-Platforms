import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanVsAchivmentProjectComponent } from './plan-vs-achivment-project.component';

describe('PlanVsAchivmentProjectComponent', () => {
  let component: PlanVsAchivmentProjectComponent;
  let fixture: ComponentFixture<PlanVsAchivmentProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanVsAchivmentProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanVsAchivmentProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
