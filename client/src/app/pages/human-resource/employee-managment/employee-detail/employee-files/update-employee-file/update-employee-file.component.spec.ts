import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeFileComponent } from './update-employee-file.component';

describe('UpdateEmployeeFileComponent', () => {
  let component: UpdateEmployeeFileComponent;
  let fixture: ComponentFixture<UpdateEmployeeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
