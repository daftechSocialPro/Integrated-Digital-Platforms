import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersDashboardComponent } from './members-dashboard.component';

describe('MembersDashboardComponent', () => {
  let component: MembersDashboardComponent;
  let fixture: ComponentFixture<MembersDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersDashboardComponent]
    });
    fixture = TestBed.createComponent(MembersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
