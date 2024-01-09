import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsSettingsComponent } from './scs-settings.component';

describe('ScsSettingsComponent', () => {
  let component: ScsSettingsComponent;
  let fixture: ComponentFixture<ScsSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsSettingsComponent]
    });
    fixture = TestBed.createComponent(ScsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
