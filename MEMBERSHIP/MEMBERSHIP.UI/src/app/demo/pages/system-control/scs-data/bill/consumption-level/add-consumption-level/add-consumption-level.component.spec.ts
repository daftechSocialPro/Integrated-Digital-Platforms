import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsumptionLevelComponent } from './add-consumption-level.component';

describe('AddConsumptionLevelComponent', () => {
  let component: AddConsumptionLevelComponent;
  let fixture: ComponentFixture<AddConsumptionLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConsumptionLevelComponent]
    });
    fixture = TestBed.createComponent(AddConsumptionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
