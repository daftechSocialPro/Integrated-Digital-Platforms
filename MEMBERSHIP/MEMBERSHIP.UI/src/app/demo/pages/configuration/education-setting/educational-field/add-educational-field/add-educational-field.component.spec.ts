import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEducationalFieldComponent } from './add-educational-field.component';

describe('AddEducationalFieldComponent', () => {
  let component: AddEducationalFieldComponent;
  let fixture: ComponentFixture<AddEducationalFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEducationalFieldComponent]
    });
    fixture = TestBed.createComponent(AddEducationalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
