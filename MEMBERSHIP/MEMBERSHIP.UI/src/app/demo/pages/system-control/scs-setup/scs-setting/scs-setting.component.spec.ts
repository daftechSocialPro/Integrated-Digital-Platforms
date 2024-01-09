import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsSettingComponent } from './scs-setting.component';

describe('ScsSettingComponent', () => {
  let component: ScsSettingComponent;
  let fixture: ComponentFixture<ScsSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsSettingComponent]
    });
    fixture = TestBed.createComponent(ScsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
