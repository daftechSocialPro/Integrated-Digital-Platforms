import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountryOriginComponent } from './add-country-origin.component';

describe('AddCountryOriginComponent', () => {
  let component: AddCountryOriginComponent;
  let fixture: ComponentFixture<AddCountryOriginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCountryOriginComponent]
    });
    fixture = TestBed.createComponent(AddCountryOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
