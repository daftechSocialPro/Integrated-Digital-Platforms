import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserMessageComponent } from './add-user-message.component';

describe('AddUserMessageComponent', () => {
  let component: AddUserMessageComponent;
  let fixture: ComponentFixture<AddUserMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserMessageComponent]
    });
    fixture = TestBed.createComponent(AddUserMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
