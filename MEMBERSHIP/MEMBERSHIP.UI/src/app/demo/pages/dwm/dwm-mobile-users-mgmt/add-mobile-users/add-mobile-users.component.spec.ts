import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMobileUsersComponent } from './add-mobile-users.component';

describe('AddMobileUsersComponent', () => {
  let component: AddMobileUsersComponent;
  let fixture: ComponentFixture<AddMobileUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMobileUsersComponent]
    });
    fixture = TestBed.createComponent(AddMobileUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
