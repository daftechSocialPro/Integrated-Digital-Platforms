import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterSizeGroupComponent } from './add-meter-size-group.component';

describe('AddMeterSizeGroupComponent', () => {
  let component: AddMeterSizeGroupComponent;
  let fixture: ComponentFixture<AddMeterSizeGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMeterSizeGroupComponent]
    });
    fixture = TestBed.createComponent(AddMeterSizeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
