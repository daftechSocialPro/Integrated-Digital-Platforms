import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsClosingComponent } from './scs-closing.component';

describe('ScsClosingComponent', () => {
  let component: ScsClosingComponent;
  let fixture: ComponentFixture<ScsClosingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsClosingComponent]
    });
    fixture = TestBed.createComponent(ScsClosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
