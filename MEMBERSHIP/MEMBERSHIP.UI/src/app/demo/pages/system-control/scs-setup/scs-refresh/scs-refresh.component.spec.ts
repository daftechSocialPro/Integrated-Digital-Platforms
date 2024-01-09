import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsRefreshComponent } from './scs-refresh.component';

describe('ScsRefreshComponent', () => {
  let component: ScsRefreshComponent;
  let fixture: ComponentFixture<ScsRefreshComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsRefreshComponent]
    });
    fixture = TestBed.createComponent(ScsRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
