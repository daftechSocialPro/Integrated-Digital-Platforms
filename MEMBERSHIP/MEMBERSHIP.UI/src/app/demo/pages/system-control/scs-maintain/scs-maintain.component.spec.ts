import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsMaintainComponent } from './scs-maintain.component';

describe('ScsMaintainComponent', () => {
  let component: ScsMaintainComponent;
  let fixture: ComponentFixture<ScsMaintainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsMaintainComponent]
    });
    fixture = TestBed.createComponent(ScsMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
