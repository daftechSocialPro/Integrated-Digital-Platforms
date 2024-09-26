import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSettingComponent } from './location-setting.component';

describe('LocationSettingComponent', () => {
  let component: LocationSettingComponent;
  let fixture: ComponentFixture<LocationSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationSettingComponent]
    });
    fixture = TestBed.createComponent(LocationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
