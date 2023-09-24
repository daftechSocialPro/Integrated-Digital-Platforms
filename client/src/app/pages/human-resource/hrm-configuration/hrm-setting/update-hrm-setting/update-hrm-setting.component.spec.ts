import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHrmSettingComponent } from './update-hrm-setting.component';

describe('UpdateHrmSettingComponent', () => {
  let component: UpdateHrmSettingComponent;
  let fixture: ComponentFixture<UpdateHrmSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHrmSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHrmSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
