import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PMConfigurationComponent } from './pm-configuration.component';

describe('PMConfigurationComponent', () => {
  let component: PMConfigurationComponent;
  let fixture: ComponentFixture<PMConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PMConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PMConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
