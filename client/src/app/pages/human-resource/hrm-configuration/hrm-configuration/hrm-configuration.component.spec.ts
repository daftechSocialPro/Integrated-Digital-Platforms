import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmConfigurationComponent } from './hrm-configuration.component';

describe('HrmConfigurationComponent', () => {
  let component: HrmConfigurationComponent;
  let fixture: ComponentFixture<HrmConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrmConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrmConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
