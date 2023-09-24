import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmSettingComponent } from './hrm-setting.component';

describe('HrmSettingComponent', () => {
  let component: HrmSettingComponent;
  let fixture: ComponentFixture<HrmSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrmSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrmSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
