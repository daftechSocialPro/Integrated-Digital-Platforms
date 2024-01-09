import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifRateGroupComponent } from './tarif-rate-group.component';

describe('TarifRateGroupComponent', () => {
  let component: TarifRateGroupComponent;
  let fixture: ComponentFixture<TarifRateGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifRateGroupComponent]
    });
    fixture = TestBed.createComponent(TarifRateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
