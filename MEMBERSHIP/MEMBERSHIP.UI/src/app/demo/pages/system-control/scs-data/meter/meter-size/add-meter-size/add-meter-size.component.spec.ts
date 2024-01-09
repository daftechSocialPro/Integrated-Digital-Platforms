import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterSizeComponent } from './add-meter-size.component';

describe('AddMeterSizeComponent', () => {
  let component: AddMeterSizeComponent;
  let fixture: ComponentFixture<AddMeterSizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMeterSizeComponent]
    });
    fixture = TestBed.createComponent(AddMeterSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
