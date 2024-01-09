import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterModelComponent } from './add-meter-model.component';

describe('AddMeterModelComponent', () => {
  let component: AddMeterModelComponent;
  let fixture: ComponentFixture<AddMeterModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMeterModelComponent]
    });
    fixture = TestBed.createComponent(AddMeterModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
