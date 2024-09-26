import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCalanderComponent } from './leave-calander.component';

describe('LeaveCalanderComponent', () => {
  let component: LeaveCalanderComponent;
  let fixture: ComponentFixture<LeaveCalanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveCalanderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveCalanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
