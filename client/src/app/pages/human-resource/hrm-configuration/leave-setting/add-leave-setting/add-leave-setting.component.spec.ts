import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveSettingComponent } from './add-leave-setting.component';

describe('AddLeaveSettingComponent', () => {
  let component: AddLeaveSettingComponent;
  let fixture: ComponentFixture<AddLeaveSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaveSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaveSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
