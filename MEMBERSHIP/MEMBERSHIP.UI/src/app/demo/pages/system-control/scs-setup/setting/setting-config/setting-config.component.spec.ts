import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingConfigComponent } from './setting-config.component';

describe('SettingConfigComponent', () => {
  let component: SettingConfigComponent;
  let fixture: ComponentFixture<SettingConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingConfigComponent]
    });
    fixture = TestBed.createComponent(SettingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
