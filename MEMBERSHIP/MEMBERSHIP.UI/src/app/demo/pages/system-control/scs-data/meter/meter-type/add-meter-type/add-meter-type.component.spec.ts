import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterTypeComponent } from './add-meter-type.component';

describe('AddMeterTypeComponent', () => {
  let component: AddMeterTypeComponent;
  let fixture: ComponentFixture<AddMeterTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMeterTypeComponent]
    });
    fixture = TestBed.createComponent(AddMeterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
