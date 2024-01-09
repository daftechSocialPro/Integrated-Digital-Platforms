import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTarifRateGroupComponent } from './add-tarif-rate-group.component';

describe('AddTarifRateGroupComponent', () => {
  let component: AddTarifRateGroupComponent;
  let fixture: ComponentFixture<AddTarifRateGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTarifRateGroupComponent]
    });
    fixture = TestBed.createComponent(AddTarifRateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
