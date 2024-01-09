import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsUsersComponent } from './scs-users.component';

describe('ScsUsersComponent', () => {
  let component: ScsUsersComponent;
  let fixture: ComponentFixture<ScsUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsUsersComponent]
    });
    fixture = TestBed.createComponent(ScsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
