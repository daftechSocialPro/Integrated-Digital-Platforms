import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeSuretyComponent } from './add-employee-surety.component';

describe('AddEmployeeSuretyComponent', () => {
  let component: AddEmployeeSuretyComponent;
  let fixture: ComponentFixture<AddEmployeeSuretyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeSuretyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeSuretyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
