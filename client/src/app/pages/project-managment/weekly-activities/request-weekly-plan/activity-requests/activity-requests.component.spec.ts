import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRequestsComponent } from './activity-requests.component';

describe('ActivityRequestsComponent', () => {
  let component: ActivityRequestsComponent;
  let fixture: ComponentFixture<ActivityRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
