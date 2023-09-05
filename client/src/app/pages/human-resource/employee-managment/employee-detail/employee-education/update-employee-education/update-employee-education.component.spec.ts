import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeEducationComponent } from './update-employee-education.component';

describe('UpdateEmployeeEducationComponent', () => {
  let component: UpdateEmployeeEducationComponent;
  let fixture: ComponentFixture<UpdateEmployeeEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
