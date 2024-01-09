import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsMiscellnaousCostTypeComponent } from './scs-miscellnaous-cost-type.component';

describe('ScsMiscellnaousCostTypeComponent', () => {
  let component: ScsMiscellnaousCostTypeComponent;
  let fixture: ComponentFixture<ScsMiscellnaousCostTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsMiscellnaousCostTypeComponent]
    });
    fixture = TestBed.createComponent(ScsMiscellnaousCostTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
