import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsReasonComponent } from './scs-reason.component';

describe('ScsReasonComponent', () => {
  let component: ScsReasonComponent;
  let fixture: ComponentFixture<ScsReasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsReasonComponent]
    });
    fixture = TestBed.createComponent(ScsReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
