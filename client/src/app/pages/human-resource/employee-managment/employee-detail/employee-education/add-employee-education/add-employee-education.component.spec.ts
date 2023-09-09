import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeEducationComponent } from './add-employee-education.component';

describe('AddEmployeeEducationComponent', () => {
  let component: AddEmployeeEducationComponent;
  let fixture: ComponentFixture<AddEmployeeEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
