import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenlityRateComponent } from './penlity-rate.component';

describe('PenlityRateComponent', () => {
  let component: PenlityRateComponent;
  let fixture: ComponentFixture<PenlityRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenlityRateComponent]
    });
    fixture = TestBed.createComponent(PenlityRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
