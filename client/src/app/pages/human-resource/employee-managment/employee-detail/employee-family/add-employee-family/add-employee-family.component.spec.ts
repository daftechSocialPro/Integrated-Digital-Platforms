import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeFamilyComponent } from './add-employee-family.component';

describe('AddEmployeeFamilyComponent', () => {
  let component: AddEmployeeFamilyComponent;
  let fixture: ComponentFixture<AddEmployeeFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeFamilyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
