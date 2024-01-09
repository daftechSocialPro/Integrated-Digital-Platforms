import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPenalityRateComponent } from './add-penality-rate.component';

describe('AddPenalityRateComponent', () => {
  let component: AddPenalityRateComponent;
  let fixture: ComponentFixture<AddPenalityRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPenalityRateComponent]
    });
    fixture = TestBed.createComponent(AddPenalityRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
