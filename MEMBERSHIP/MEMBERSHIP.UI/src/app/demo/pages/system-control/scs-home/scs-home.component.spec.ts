import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsHomeComponent } from './scs-home.component';

describe('ScsHomeComponent', () => {
  let component: ScsHomeComponent;
  let fixture: ComponentFixture<ScsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsHomeComponent]
    });
    fixture = TestBed.createComponent(ScsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
