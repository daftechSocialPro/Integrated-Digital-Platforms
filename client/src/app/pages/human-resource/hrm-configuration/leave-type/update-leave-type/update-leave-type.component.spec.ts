import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaveTypeComponent } from './update-leave-type.component';

describe('UpdateLeaveTypeComponent', () => {
  let component: UpdateLeaveTypeComponent;
  let fixture: ComponentFixture<UpdateLeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLeaveTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
