import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionLevelComponent } from './consumption-level.component';

describe('ConsumptionLevelComponent', () => {
  let component: ConsumptionLevelComponent;
  let fixture: ComponentFixture<ConsumptionLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumptionLevelComponent]
    });
    fixture = TestBed.createComponent(ConsumptionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
