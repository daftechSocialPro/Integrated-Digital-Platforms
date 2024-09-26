import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationSettingComponent } from './education-setting.component';

describe('EducationSettingComponent', () => {
  let component: EducationSettingComponent;
  let fixture: ComponentFixture<EducationSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationSettingComponent]
    });
    fixture = TestBed.createComponent(EducationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
