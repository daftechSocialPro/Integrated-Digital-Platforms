import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsTariffComponent } from './cons-tariff.component';

describe('ConsTariffComponent', () => {
  let component: ConsTariffComponent;
  let fixture: ComponentFixture<ConsTariffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsTariffComponent]
    });
    fixture = TestBed.createComponent(ConsTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
