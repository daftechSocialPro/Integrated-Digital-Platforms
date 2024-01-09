import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsTariffComponent } from './add-cons-tariff.component';

describe('AddConsTariffComponent', () => {
  let component: AddConsTariffComponent;
  let fixture: ComponentFixture<AddConsTariffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConsTariffComponent]
    });
    fixture = TestBed.createComponent(AddConsTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
