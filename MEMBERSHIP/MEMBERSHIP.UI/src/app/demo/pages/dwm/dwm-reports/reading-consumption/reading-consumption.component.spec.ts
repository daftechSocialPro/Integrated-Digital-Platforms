import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingConsumptionComponent } from './reading-consumption.component';

describe('ReadingConsumptionComponent', () => {
  let component: ReadingConsumptionComponent;
  let fixture: ComponentFixture<ReadingConsumptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadingConsumptionComponent]
    });
    fixture = TestBed.createComponent(ReadingConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
