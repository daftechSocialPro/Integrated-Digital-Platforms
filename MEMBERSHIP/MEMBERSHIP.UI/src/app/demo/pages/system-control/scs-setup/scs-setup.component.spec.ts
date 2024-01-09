import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsSetupComponent } from './scs-setup.component';

describe('ScsSetupComponent', () => {
  let component: ScsSetupComponent;
  let fixture: ComponentFixture<ScsSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsSetupComponent]
    });
    fixture = TestBed.createComponent(ScsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
