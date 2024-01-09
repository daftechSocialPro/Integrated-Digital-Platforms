import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOriginComponent } from './country-origin.component';

describe('CountryOriginComponent', () => {
  let component: CountryOriginComponent;
  let fixture: ComponentFixture<CountryOriginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryOriginComponent]
    });
    fixture = TestBed.createComponent(CountryOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
