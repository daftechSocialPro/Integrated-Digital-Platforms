import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHrmSettingComponent } from './add-hrm-setting.component';

describe('AddHrmSettingComponent', () => {
  let component: AddHrmSettingComponent;
  let fixture: ComponentFixture<AddHrmSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHrmSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHrmSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
