import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeSuretyComponent } from './update-employee-surety.component';

describe('UpdateEmployeeSuretyComponent', () => {
  let component: UpdateEmployeeSuretyComponent;
  let fixture: ComponentFixture<UpdateEmployeeSuretyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeSuretyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeeSuretyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
