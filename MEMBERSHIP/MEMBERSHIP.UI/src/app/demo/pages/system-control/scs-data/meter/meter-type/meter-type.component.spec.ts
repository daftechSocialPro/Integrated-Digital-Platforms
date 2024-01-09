import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterTypeComponent } from './meter-type.component';

describe('MeterTypeComponent', () => {
  let component: MeterTypeComponent;
  let fixture: ComponentFixture<MeterTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterTypeComponent]
    });
    fixture = TestBed.createComponent(MeterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
