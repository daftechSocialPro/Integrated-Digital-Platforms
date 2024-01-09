import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingLogComponent } from './pending-log.component';

describe('PendingLogComponent', () => {
  let component: PendingLogComponent;
  let fixture: ComponentFixture<PendingLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingLogComponent]
    });
    fixture = TestBed.createComponent(PendingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
