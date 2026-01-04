import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStrategicPeriodComponent } from './add-strategic-period.component';

describe('AddStrategicPeriodComponent', () => {
  let component: AddStrategicPeriodComponent;
  let fixture: ComponentFixture<AddStrategicPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStrategicPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStrategicPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

