import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSuretyComponent } from './employee-surety.component';

describe('EmployeeSuretyComponent', () => {
  let component: EmployeeSuretyComponent;
  let fixture: ComponentFixture<EmployeeSuretyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSuretyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSuretyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
