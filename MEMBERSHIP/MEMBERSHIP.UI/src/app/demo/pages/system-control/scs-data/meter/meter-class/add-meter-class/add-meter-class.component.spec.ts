import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterClassComponent } from './add-meter-class.component';

describe('AddMeterClassComponent', () => {
  let component: AddMeterClassComponent;
  let fixture: ComponentFixture<AddMeterClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMeterClassComponent]
    });
    fixture = TestBed.createComponent(AddMeterClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
