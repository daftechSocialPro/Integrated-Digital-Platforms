import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStrategicPeriodComponent } from './update-strategic-period.component';

describe('UpdateStrategicPeriodComponent', () => {
  let component: UpdateStrategicPeriodComponent;
  let fixture: ComponentFixture<UpdateStrategicPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStrategicPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStrategicPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

