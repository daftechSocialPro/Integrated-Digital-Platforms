import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeFamilyComponent } from './update-employee-family.component';

describe('UpdateEmployeeFamilyComponent', () => {
  let component: UpdateEmployeeFamilyComponent;
  let fixture: ComponentFixture<UpdateEmployeeFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeFamilyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeeFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
