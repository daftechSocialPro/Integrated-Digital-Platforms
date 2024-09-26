import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeFileComponent } from './add-employee-file.component';

describe('AddEmployeeFileComponent', () => {
  let component: AddEmployeeFileComponent;
  let fixture: ComponentFixture<AddEmployeeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
